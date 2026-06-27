"use client";

import Link from "next/link";
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

export default function Search() { 
  const [istoggle, setistoggle] = useState(false);
  const [musterProduct, setmusterProduct] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [query, setquery] = useState("");
  const [results, setresults] = useState([]);
  const { addCart } = useCart();

  
  useEffect(() => {
    async function getLiveProducts() {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        

        const flatendData = data.flatMap(item => item.cloths || []);
        setmusterProduct(flatendData);
      } catch (error) {
        console.error("Failed fetching live archive", error);
      } finally {
        setLoading(false);
      }
    }
    getLiveProducts();
  }, []);


  useEffect(() => {
    if (query.trim() === "") {
      setresults([]);
      return;
    }
    
    const searchkey = query.toLowerCase();
    const filtered = musterProduct.filter((product) => {
     
      const matchName = product.name?.toLowerCase().includes(searchkey);
      const matchDesc = product.description?.toLowerCase().includes(searchkey);
      return matchName || matchDesc;
    });
    setresults(filtered);
  }, [query, musterProduct]);

  if (Loading) {
    return <div>PLEASE WAIT A MINUTE...</div>;
  }

  return (
    <div className="search-mother">
     
      <div className="search">
        <button onClick={() => setistoggle(!istoggle)}>
          {istoggle ? (
            <img src="/x.svg" alt="Close search" />
          ) : (
            <img src="/magnifying-glass-solid-full.svg" alt="Open search" />
          )}
        </button>
      </div>

      <div className={istoggle ? 'oval active' : 'oval'}>
        <span>
          VIEUX <img src="/magnifying-glass-solid-full.svg" alt="Search icon" />
        </span>

        <input 
          type="search" 
          placeholder="Search collections..." 
          value={query} 
          onChange={(e) => setquery(e.target.value)}
          className={istoggle ? 'inpu active' : 'inpu'} 
        />

        <div className="Search-cont">
          {results.length > 0 ? (
         
              <ul className="Search-engine">
                {results.map((product) => (
                  <li key={product.id} className="Search-display">
                   
                    <Link href={`/products/${product.id}`} onClick={() => setistoggle(false)}>
                     
                      <img src={product.image} alt={product.name} />
                      <div className="spans">
                        <span>{product.name}</span>
                        <span>${product.price}</span>
                      </div>
                    </Link>
                    
                    <button 
                      onClick={() => addCart(product, "M")} 
                      className="search-button"
                    >
                      ADD TO CART
                    </button>
                  </li>
                ))}
              </ul>
           
          ) : (  
            query && <p className="noarch">NO ARCHIVE FOUND</p>
          )}
          </div>
        </div>
      </div>
  );
}