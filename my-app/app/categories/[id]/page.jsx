"use client";

import styles from './page.module.css';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; 
import Link from "next/link"; 
import { useCart } from '@/app/context/CartContext';
export default function CategoryPage() {
  const params = useParams();
 
  const categoryParam = params.categoryName || params.id || params.category;

  const [isLoading, setisLoading] = useState(true);
  const [products, setproducts] = useState([]);
  const [isError, setisError] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetails, setshowDetails] = useState(false);
  const { addCart } = useCart();
  const categories = ["CLASSIC", "OLD SCHOOL", "VINTAGE", "MODERN", "CULTURAL", "CASUAL", "FORMAL", "INFORMAL"];

useEffect(() => {
  async function fetchCategoryData() {
    try {
      setisLoading(true);
      setisError(false);

      console.log("📡 [1/4] Front-end parameter read successfully. Looking for category:", categoryParam);

      if (!categoryParam) {
        console.error("❌ CRITICAL: Next.js could not read the category parameter from the URL. Check your folder name spelling!");
        setisLoading(false);
        return;
      }

      const apiPath = '/api/products'; 
      console.log(`📡 [2/4] Knocking on backend API door at: ${apiPath}`);
      
      const res = await fetch(apiPath);
      
      if (!res.ok) {
        console.error(`❌ BACKEND ERROR: Server responded with status code ${res.status}`);
        setisError(true);
        return; 
      }
      
      const data = await res.json();
      console.log("📡 [3/4] Backend successfully answered! Full raw data received:", data);

      // Standardize your key layout matching (e.g., "old-school" -> "OLD SCHOOL")
      const targetCategoryKey = categoryParam.replace('-', ' ').toUpperCase();
      console.log(`📡 [4/4] Searching array for group matching key: "${targetCategoryKey}"`);

      const matchedGroup = data.find(group => group.categoryName === targetCategoryKey);
      
      if (matchedGroup) {
        console.log(`✅ MATCH FOUND! Loaded ${matchedGroup.cloths.length} products into state.`);
        setproducts(matchedGroup.cloths);
      } else {
        console.warn(`⚠️ Key match failed. We searched for "${targetCategoryKey}" but it didn't match any category keys inside the backend object data.`);
        setproducts([]);
      }
      
    } catch (error) {
      console.error("❌ NETWORK/FETCH EXCEPTION CRASH:", error);
      setisError(true);
    } finally {
      setisLoading(false);
    }
  }
  
  if (categoryParam) {
    fetchCategoryData();
  } else {
    console.warn("⏳ Waiting for parameter... categoryParam is currently empty.");
  }
}, [categoryParam]);

  if (isLoading) {
    return (
      <div className={styles['loader'] || ''}>
        
      <video  
        src="/glass.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline 
        className={styles['background-videos']} 
      />
      <div className={styles['overlay1']}></div>
        <h3>Please wait a moment ...</h3>
      </div>
    );
  }

  if (isError || products.length === 0) {
    return (
      <div className={styles['error']|| ''}>
        
      <video  
        src="/glass.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline 
        className={styles['background-videos']} 
      />
      <div className={styles['overlay1']}></div>
        <h3>No products found in this archive</h3>

        <Link href="/archieve"  className={styles['return']}><button>RETURN TO ARCHIVE</button></Link>
      </div>
    );
  }

  return (
    <div className={styles['page-container']}>


      <div className={styles['product-nave']}>
        <ul>
          <li>
        <Link href='../archieve'>ALL</Link>

          </li>
          {categories.map((cat) => (
            <li key={cat}>
              <Link href={`/categories/${cat.toLowerCase().replace(' ', '-')}`}>
                {cat}
              </Link>
            </li>
          ))}
        </ul>
      </div>

  
      <video  
        src="/glass.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline 
        className={styles['background-videos']} 
      />
      <div className={styles['overlay1']}></div>

    
      <div className={styles['products-contaner']}>
        <div className={styles['main-products']}>
          <ul>

            {products.map((item) => (
              <li key={item.id} className={styles['product-item']}>
                <img src={item.image} alt={item.name} className={styles["product-image"]} />
                
                <div className={styles['flow']}>
                  <div className={styles['span-contain']}>
                    <span>Name: {item.name}</span>
                    <span>Price: ${item.price}</span>
                  </div>
                  
                 
                  <div className={styles["tails"]} onClick={() => {
                    setSelectedProduct(item);
                    setshowDetails(true);
                  }}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

      
        {showDetails && selectedProduct && (
          <div className={styles["product-details"]}>
            <button className={styles["product-close"]} onClick={() => setshowDetails(false)}>
              <img src="/x.svg" alt="Close view"/>
            </button>

            <img src={selectedProduct.image} alt={selectedProduct.name}/>

            <div className={styles["pro-details"]}>
              <div className={styles["product-details1"]}>
                <h3 className={styles["product-deat"]}>NAME: {selectedProduct.name}</h3>
                <p>PRICE: ${selectedProduct.price}</p>
                <p>{selectedProduct.description}</p>
              </div>

              <div className={styles["product-remain"]}>
                <p>Sizes: {selectedProduct.sizes ? selectedProduct.sizes.join(', ') : 'S, M, L, XL'}</p>
               <button onClick={() => addCart(selectedProduct)}>Add Cart</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}