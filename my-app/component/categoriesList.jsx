import Link from "next/link";

export const categoriesTitles = {
    '1': 'classic',
    '2': 'old-school',
    '3': 'vintage',
    '4': 'modern',
    '5': 'culture',
    '6': 'casual',
    '7': 'formal',
    '8': 'informal',
};

export async function GetCategory() {
    try {
        // ✅ FIX: Added { cache: 'no-store' } to completely bypass Next.js's sticky cache
        const res = await fetch('https://api.escuelajs.co/api/v1/categories?limit=8', {
            cache: 'no-store'
        });
        
        if (!res.ok) {
            throw new Error(`Failed to fetch categories. Status: ${res.status}`);
        }
        
        const apicategories = await res.json();

        return (
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {apicategories.map((category) => {
                    const idString = String(category.id);
                    
                    // Safe check: Only render if the ID is mapped in your categoriesTitles object
                    if (!categoriesTitles[idString]) {
                        return null;
                    }
                    
                    return (
                        <Link 
                            key={category.id}
                            href={`/category/${category.id}`} 
                            style={{
                                textDecoration: 'none',
                                color: 'white',
                                padding: '8px 16px',
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                borderRadius: '4px',
                            }}
                        >
                            {categoriesTitles[idString]} 
                        </Link>
                    );
                })}
            </div>
        );
    } catch (error) {
        console.error('Error loading categories:', error);
        return <div style={{ color: 'red' }}>Failed to load categories</div>;
    }
}