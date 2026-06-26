import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Reusable Luxury Title Generator matching your main API logic
function luxuryTitles(originalTitle, category) {
  if (category === "VINTAGE") return "Nero Distressed Canvas Silhouette";
  if (category === "CLASSIC") return "Monochrome Tailored Essential Blazer";
  if (category === "OLD SCHOOL") return "Heavyweight Ribbed Collar Pullover";
  if (category === "INFORMAL") return "Row Edge Dropped Shoulder Tee";
  if (category === "MODERN") return "Minimalist Sculpted Technical Overshirt";
  if (category === "CULTURAL") return "Asymmetric Structural Concept Piece";
  
  const cleanTitle = originalTitle.split(' ').slice(0, 2).join(' ');
  return `Vieux Luxury ${category.charAt(0) + category.slice(1).toLowerCase()} - ${cleanTitle}`;
}

// Production Fallback: Rebuilds the nested catalog array layout in memory if JSON cache doesn't exist
function generateCatalogInMemory(rawProducts) {
  const clothItems = rawProducts.filter(
    item => item.category === "men's clothing" || item.category === "women's clothing"
  );

  const catalogData = {
    "CLASSIC": [], "OLD SCHOOL": [], "VINTAGE": [], "MODERN": [],
    "CULTURAL": [], "CASUAL": [], "FORMAL": [], "INFORMAL": [],
  };

  clothItems.forEach((item, index) => {
    const title = item.title.toLowerCase();
    const description = item.description.toLowerCase(); 
    let assignedCategories = "";

    if (title.includes('jacket') || title.includes('raincoat') || title.includes('windbreaker')) {
      assignedCategories = "VINTAGE";
    } else if (title.includes('cotton') || title.includes('hoodie') || description.includes('fleece')) {
      assignedCategories = "OLD SCHOOL";
    } else if (title.includes('t-shirt') || title.includes('tee') || title.includes('graphic')) {
      assignedCategories = "INFORMAL";
    } else if (title.includes('slim') || title.includes('fit') || title.includes('shirt') || title.includes('solid')) {
      assignedCategories = "CLASSIC";
    } else {
      const fallbacks = ["CASUAL", "MODERN"];
      assignedCategories = fallbacks[index % fallbacks.length];
    }

    if (catalogData[assignedCategories]) {
      catalogData[assignedCategories].push({
        id: String(item.id),
        name: luxuryTitles(item.title, assignedCategories), 
        price: Math.round(item.price * 1.5),
        description: item.description,
        image: item.image,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: assignedCategories === "CLASSIC" || assignedCategories === "VINTAGE" 
          ? ["#000000", "#1A1A1A"] 
          : ["#FFFFFF", "#222222"]
      });
    }
  });

  return Object.keys(catalogData).map(catName => ({
    categoryName: catName,
    cloths: catalogData[catName]
  }));
}

export async function GET(request, { params }) {
  try {
    // 1. Properly unwrap the parameters passed by Next.js
    const { id } = await params; 
    let catalog = null;

    const filepath = path.join(process.cwd(), "vieux-cached-products.json");
    
    // 2. Try to grab local storage data during development
    if (fs.existsSync(filepath)) {
      const fileContent = fs.readFileSync(filepath, 'utf-8');
      catalog = JSON.parse(fileContent);
    } else {
      // 3. PRODUCTION FAILSAFE: Rebuild the collection data dynamically if running on a live serverless cloud
      console.log("JSON Cache absent on cloud instance disk. Re-processing array structure dynamically...");
      const res = await fetch('https://fakestoreapi.com/products');
      if (!res.ok) throw new Error("External api is unreachable");
      
      const rawProducts = await res.json();
      catalog = generateCatalogInMemory(rawProducts);
    }

    // 4. Your clean lookup loop (unchanged, works perfectly!)
    let foundProduct = null;
    for (const section of catalog) {
      const match = section.cloths.find((item) => String(item.id) === String(id));
      if (match) {
        foundProduct = match;
        break; 
      }
    }

    if (!foundProduct) {
      return NextResponse.json({ error: "Product not found in luxury category" }, { status: 404 });
    }

    return NextResponse.json(foundProduct, { status: 200 });

  } catch (err) {
    console.error("Single product fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch single product" }, { status: 500 });
  }
}