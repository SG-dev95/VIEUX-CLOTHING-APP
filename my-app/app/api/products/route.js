import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

// 1. FIXED: Placed at the top and updated the fallback to preserve unique names
function luxuryTitles(originalTitle, category) {
  if (category === "VINTAGE") return "Nero Distressed Canvas Silhouette";
  if (category === "CLASSIC") return "Monochrome Tailored Essential Blazer";
  if (category === "OLD SCHOOL") return "Heavyweight Ribbed Collar Pullover";
  if (category === "INFORMAL") return "Row Edge Dropped Shoulder Tee";
  if (category === "MODERN") return "Minimalist Sculpted Technical Overshirt";
  if (category === "CULTURAL") return "Asymmetric Structural Concept Piece";
  
  // Dynamic fallback so CASUAL and FORMAL items don't all share the exact same name
  const cleanTitle = originalTitle.split(' ').slice(0, 2).join(' ');
  return `Vieux Luxury ${category.charAt(0) + category.slice(1).toLowerCase()} - ${cleanTitle}`;
}

export async function GET() {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    const rawProducts = await res.json();
    
    // Filter for clothing items
    const clothItems = rawProducts.filter(
      item => item.category === "men's clothing" || item.category === "women's clothing"
    );

    const catalogData = {
      "CLASSIC": [],
      "OLD SCHOOL": [],
      "VINTAGE": [],
      "MODERN": [],
      "CULTURAL": [],
      "CASUAL": [],
      "FORMAL": [],
      "INFORMAL": [],
    };

clothItems.forEach((item, index) => {
  const title = item.title.toLowerCase();
  const description = item.description.toLowerCase(); 
  let assignedCategories = "";

 
  if (title.includes('jacket') || title.includes('raincoat') || title.includes('windbreaker')) {
    assignedCategories = "VINTAGE";
  } 
  
  else if (title.includes('hoodie') || description.includes('fleece') || title.includes('sweater')) {
    assignedCategories = "OLD SCHOOL";
  } 
  

  else if (title.includes('t-shirt') || title.includes('tee') || title.includes('graphic')) {
    assignedCategories = "INFORMAL";
  } 
  
  // 4. FORMAL (Tailored blazers, suits, elegant dress wear)
  else if (title.includes('dress') || title.includes('suit') || title.includes('blazer')) {
    assignedCategories = "FORMAL";
  }

  
  else if (title.includes('biker') || description.includes('wrap') || description.includes('detail')) {
    assignedCategories = "CULTURAL";
  }

  
  else if (description.includes('nylon') || description.includes('moisture') || description.includes('breathable')) {
    assignedCategories = "MODERN";
  }

 
  else if (title.includes('shirt') && (title.includes('slim') || title.includes('fit') || title.includes('solid'))) {
    assignedCategories = "CLASSIC";
  } 
  
  else { 
    assignedCategories = "CASUAL";
  }

  
  if (!assignedCategories) {
    const backupPool = ["MODERN", "CASUAL"];
    assignedCategories = backupPool[index % backupPool.length];
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

    const finalCatalog = Object.keys(catalogData).map(catName => ({
      categoryName: catName,
      cloths: catalogData[catName]
    }));

    // 2. FIXED: Safe guard for serverless environments. 
    // This only writes the file on your local machine, preventing crashes online.
    if (process.env.NODE_ENV === 'development') {
      try {
        const filePath = path.join(process.cwd(), 'vieux-cached-products.json');
        fs.writeFileSync(filePath, JSON.stringify(finalCatalog, null, 2), 'utf-8'); 
      } catch (fsError) {
        console.warn("Local cache save skipped:", fsError.message);
      }
    }

    return NextResponse.json(finalCatalog, { status: 200 });

  } catch (error) {
    console.error("Catalog Build Error:", error); 
    return NextResponse.json({ error: 'failed to build catalog' }, { status: 500 });
  }
}