import { NextResponse } from 'next/server';

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

function generateCatalogInMemory(rawProducts) {
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

  return Object.keys(catalogData).map(catName => ({
    categoryName: catName,
    cloths: catalogData[catName]
  }));
}

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    console.log(`📡 Cloud Pipeline: Syncing multi-category data for ID: ${id}`);
    
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
    
    const catalog = generateCatalogInMemory(rawProducts);

    let foundProduct = null;
    for (const section of catalog) {
      const match = section.cloths.find((item) => String(item.id) === String(id));
      if (match) {
        foundProduct = match;
        break; 
      }
    }

    if (!foundProduct) {
      return NextResponse.json({ error: "Product mapping profile not found" }, { status: 404 });
    }

    return NextResponse.json(foundProduct, { status: 200 });

  } catch (err) {
    console.error("Global Single Product ID Route Crash:", err);
    return NextResponse.json({ error: "Failed to parse dynamic catalog item secure pipeline" }, { status: 404 });
  }
}