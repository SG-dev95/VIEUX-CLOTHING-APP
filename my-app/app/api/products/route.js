import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

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
    console.log("📡 Cloud Pipeline: Fetching multi-category live fashion data...");
    

    const [mensRes, womensRes, shoesRes] = await Promise.all([
      fetch('https://dummyjson.com/products/category/mens-shirts'),
      fetch('https://dummyjson.com/products/category/womens-dresses'),
      fetch('https://dummyjson.com/products/category/mens-shoes')
    ]);

    const [mensData, womensData, shoesData] = await Promise.all([
      mensRes.json(),
      womensRes.json(),
      shoesRes.json()
    ]);

    const rawProducts = [
      ...(mensData.products || []),
      ...(womensData.products || []),
      ...(shoesData.products || [])
    ];

    const catalogData = {
      "CLASSIC": [], "OLD SCHOOL": [], "VINTAGE": [], "MODERN": [],
      "CULTURAL": [], "CASUAL": [], "FORMAL": [], "INFORMAL": [],
    };


    rawProducts.forEach((item, index) => {
      const categories = ["CLASSIC", "OLD SCHOOL", "VINTAGE", "MODERN", "CULTURAL", "CASUAL", "FORMAL", "INFORMAL"];
      const assignedCategories = categories[index % categories.length];

      if (catalogData[assignedCategories]) {
        catalogData[assignedCategories].push({
          id: String(item.id),
          name: luxuryTitles(item.title, assignedCategories), 
          price: Math.round(item.price * 1.5),
          description: item.description,
          image: item.thumbnail, 
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

    return NextResponse.json(finalCatalog, { status: 200 });

  } catch (error) {
    console.error("Global API Route Crash:", error);
    const fallbackCatalog = ["CLASSIC", "OLD SCHOOL", "VINTAGE", "MODERN", "CULTURAL", "CASUAL", "FORMAL", "INFORMAL"].map(cat => ({
      categoryName: cat,
      cloths: []
    }));
    return NextResponse.json(fallbackCatalog, { status: 200 });
  }
}