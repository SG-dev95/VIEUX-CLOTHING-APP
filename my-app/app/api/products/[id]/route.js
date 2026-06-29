import { NextResponse } from 'next/server';

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

    // 1. VINTAGE
    if (title.includes('jacket') || title.includes('raincoat') || title.includes('windbreaker')) {
      assignedCategories = "VINTAGE";
    } 
    // 2. OLD SCHOOL
    else if (title.includes('hoodie') || description.includes('fleece') || title.includes('sweater')) {
      assignedCategories = "OLD SCHOOL";
    } 
    // 3. INFORMAL
    else if (title.includes('t-shirt') || title.includes('tee') || title.includes('graphic')) {
      assignedCategories = "INFORMAL";
    } 
    // 4. FORMAL
    else if (title.includes('dress') || title.includes('suit') || title.includes('blazer')) {
      assignedCategories = "FORMAL";
    }
    // 5. CULTURAL
    else if (title.includes('biker') || description.includes('wrap') || description.includes('detail')) {
      assignedCategories = "CULTURAL";
    }
    // 6. MODERN
    else if (description.includes('nylon') || description.includes('moisture') || description.includes('breathable')) {
      assignedCategories = "MODERN";
    }
    // 7. CLASSIC
    else if (title.includes('shirt') && (title.includes('slim') || title.includes('fit') || title.includes('solid'))) {
      assignedCategories = "CLASSIC";
    } 
    // 8. CASUAL
    else { 
      assignedCategories = "CASUAL";
    }

    if (catalogData[assignedCategories]) {
      catalogData[assignedCategories].push({
        id: String(item.id),
        name: luxuryTitles(item.title, assignedCategories), 
        price: Math.round(item.price * 1.5),
        description: item.description,
        image: item.image,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: assignedCategories === "CLASSIC" || assignedCategories === "VINTAGE" || assignedCategories === "FORMAL"
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
    const { id } = await params; 
    let catalog = null;

    // 🛡️ SERVERLESS GUARD: Only look for the local file on your computer
    if (process.env.NODE_ENV === 'development') {
      try {
        const localFs = require('fs');
        const localPath = require('path');
        const filepath = localPath.join(process.cwd(), "vieux-cached-products.json");
        
        if (localFs.existsSync(filepath)) {
          const fileContent = localFs.readFileSync(filepath, 'utf-8');
          catalog = JSON.parse(fileContent);
          console.log("💾 Read catalog successfully from local file cache system.");
        }
      } catch (fileSystemError) {
        console.warn("Local cache file read bypassed:", fileSystemError.message);
      }
    }

    // 🚀 VERCEL PRODUCTION REBUILD: If running on cloud environment, bypass disk file operations entirely
    if (!catalog) {
      console.log("☁️ Vercel instance: Re-processing category array structures inside runtime memory stream...");
      const res = await fetch('https://fakestoreapi.com/products');
      if (!res.ok) throw new Error("External api is unreachable");
      
      const rawProducts = await res.json();
      catalog = generateCatalogInMemory(rawProducts);
    }

    // Isolate single product
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