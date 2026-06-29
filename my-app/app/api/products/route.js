import { NextResponse } from "next/server";
import path from 'path';

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

export async function GET() {
  try {
    console.log("📡 Cloud Pipeline: Initiating external apparel sync stream...");
    
    const res = await fetch('https://fakestoreapi.com/products', {
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 60 } // Cache data for 60 seconds to mitigate API rate limits
    });

    // 🛡️ CRITICAL SAFETYS: Check if the response failed or returned an HTML error page
    const contentType = res.headers.get("content-type");
    if (!res.ok || !contentType || !contentType.includes("application/json")) {
      console.warn("⚠️ FakeStore API is rate-limiting or down. Executing defensive layout fallback.");
      
      // Return a clean catalog data mapping instead of throwing a 500 error
      const emptyCleanCatalog = ["CLASSIC", "OLD SCHOOL", "VINTAGE", "MODERN", "CULTURAL", "CASUAL", "FORMAL", "INFORMAL"].map(cat => ({
        categoryName: cat,
        cloths: []
      }));
      return NextResponse.json(emptyCleanCatalog, { status: 200 });
    }

    // Now safe to parse because we verified it's valid JSON data
    const rawProducts = await res.json();
    
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
      } else if (title.includes('hoodie') || description.includes('fleece') || title.includes('sweater')) {
        assignedCategories = "OLD SCHOOL";
      } else if (title.includes('t-shirt') || title.includes('tee') || title.includes('graphic')) {
        assignedCategories = "INFORMAL";
      } else if (title.includes('dress') || title.includes('suit') || title.includes('blazer')) {
        assignedCategories = "FORMAL";
      } else if (title.includes('biker') || description.includes('wrap') || description.includes('detail')) {
        assignedCategories = "CULTURAL";
      } else if (description.includes('nylon') || description.includes('moisture') || description.includes('breathable')) {
        assignedCategories = "MODERN";
      } else if (title.includes('shirt') && (title.includes('slim') || title.includes('fit') || title.includes('solid'))) {
        assignedCategories = "CLASSIC";
      } else { 
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

    const finalCatalog = Object.keys(catalogData).map(catName => ({
      categoryName: catName,
      cloths: catalogData[catName]
    }));

    // 🛡️ LOCAL SYSTEM GUARD: Only attempt filesystem tasks if on your local machine
    if (process.env.NODE_ENV === 'development') {
      try {
        const localFs = require('fs');
        const filePath = path.join(process.cwd(), 'vieux-cached-products.json');
        localFs.writeFileSync(filePath, JSON.stringify(finalCatalog, null, 2), 'utf-8'); 
        console.log("💾 Local Environment: Updated backup json file.");
      } catch (fsErr) {
        console.warn("Local disk operation bypassed:", fsErr.message);
      }
    }

    return NextResponse.json(finalCatalog, { status: 200 });

  } catch (error) {
    console.error("Vercel Catalog Build Runtime Crash:", error); 
    return NextResponse.json({ error: 'Failed to process apparel stream collection securely' }, { status: 500 });
  }
}