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
  const clothItems = rawProducts.filter(
    item => item.category === "men's clothing" || item.category === "women's clothing"
  );

  const catalogData = {
    "CLASSIC": [], "OLD SCHOOL": [], "VINTAGE": [], "MODERN": [],
    "CULTURAL": [], "CASUAL": [], "FORMAL": [], "INFORMAL": [],
  };

  clothItems.forEach((item) => {
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

  return Object.keys(catalogData).map(catName => ({
    categoryName: catName,
    cloths: catalogData[catName]
  }));
}

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    console.log("📡 Cloud Pipeline: Fetching live data for product ID:", id);
    const res = await fetch('https://fakestoreapi.com/products', {
      headers: { 
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    
    const contentType = res.headers.get("content-type");
    if (!res.ok || !contentType || !contentType.includes("application/json")) {
      return NextResponse.json({ error: "External live API unreachable at this moment" }, { status: 503 });
    }

    const rawProducts = await res.json();
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
      return NextResponse.json({ error: "Product not found in live luxury category mapping" }, { status: 404 });
    }

    return NextResponse.json(foundProduct, { status: 200 });

  } catch (err) {
    console.error("Live single product error:", err);
    return NextResponse.json({ error: "Failed to resolve live product stream data" }, { status: 500 });
  }
}