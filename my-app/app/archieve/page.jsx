"use client";

import styles from './page.module.css';
import Link from "next/link";
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';


export default function ArchiveLogic() {
 const categories = ["CLASSIC", "OLD SCHOOL", "VINTAGE", "MODERN", "CULTURAL", "CASUAL", "FORMAL", "INFORMAL"];


  const [collection, setCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const { addCart } = useCart();

  useEffect(() => {
    async function fetchCollections() { 
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
     
        const masterList = data.flatMap(item => item.cloths || []);
        setCollection(masterList);
      } catch (error) {
        console.error("Error fetching collection:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchCollections(); 
  }, []);

  if (isLoading) {
    return (
      <div className={styles['loader']}>
         
         <video  
        src="/glass.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline 
        className={styles['background-videos']} 
      />
      <div className={styles['overlay1']}></div>
        <h1>LOADING PLEASE WAIT A MOMENT...</h1>
      </div>
    );
  }

  if (isError || !collection.length) {
    return (
      <div className={styles['error']}>
         <video  
        src="/glass.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline 
        className={styles['background-videos']} 
      />
      <div className={styles['overlay1']}></div>
        <h1>FAILED TO GET PRODUCTS</h1>
           <Link href="/product"  className={styles['return']}><button>RETURN TO HOME</button></Link>
      </div>
    );
  }

  return (
    <div className={styles['contact-container']}>

   <div className={styles['product-nave']}>
        <ul>
          {categories.map((cat) => (
            <li key={cat}>
              <Link href={`/categories/${cat.toLowerCase().replace(' ', '-')}`}>
                {cat}
              </Link>
            </li>
          ))}
        </ul>
      </div>



      {/* Background Video */}
      <video  
        src="/glass.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline 
        className={styles['background-videos']} 
      />
      <div className={styles['overlay1']}></div>

      {/* Header */}
      <div className={styles['header']}>
        <h1>VIEUX ARCHIVE / ALL PRODUCTS</h1>
        <p>ITEMS AVAILABLE</p>
      </div>

      {/* Product Grid */}
      <div className={styles['whole-items']}>
        <div className={styles['items-contain']}>
          {collection.map((product) => (
            <div key={product.id} className={styles['items']}>
              <img src={product.image} alt={product.name}/>

              <div className={styles['flow']}>
                <div className={styles['span-contain']}>
                  <span>Name: {product.name}</span>
                  <span>Price: ${product.price}</span>
                </div>
                
          
                <div className={styles["tails"]} onClick={() => setSelectedProduct(product)}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

     
      {selectedProduct && (
        <div className={styles["product-details"]}>
        
          <button className={styles["product-close"]} onClick={() => setSelectedProduct(null)}>
            <img src="/x.svg" alt="Close modal"/>
          </button>

          <img src={selectedProduct.image} alt={selectedProduct.name}/>

          <div className={styles["pro-details"]}>
            <div className={styles["product-details1"]}>
              <h3 className={styles["product-deat"]}>NAME: {selectedProduct.name}</h3>
              <p>PRICE: ${selectedProduct.price}</p>
              <p>{selectedProduct.description}</p>
            </div>

            <div className={styles["product-remain"]}>
         
              <p>Sizes: {selectedProduct.sizes ? selectedProduct.sizes.join(', ') : 'N/A'}</p>
              
    
              <button onClick={() => addCart(selectedProduct)}>Add to Cart</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}