"use client"
import { useState } from 'react';
import styles from './page.module.css';
import Link from "next/link";
export default function List(){
    
    const [OpenMenu,setOpenMenu]= useState(null);
    const categories = ["CLASSIC","OLD-SCHOOL","VINTAGE","MODERN","CULTURAL","CASUAL","FORMAL","INFORMAL"]
    const toggleMenu = (menuName) => { 
      if(OpenMenu === menuName){
        setOpenMenu(null)
      }else{
        setOpenMenu(menuName)
      }
    }



return( 
   
<div className={styles["details-rows"]}>
<div className={styles["cat nav-group"]}>

<button className={styles["categ buttom"]} onClick={()=>
  toggleMenu('categgories')
}>CATEGORIES</button>
{OpenMenu === 'categgories' &&( 
 <div className={styles["lists"]}>
  <ul className={styles["category-list lists"]}>
 
{categories.map((cat)=>( 
    <li key={cat}>
        <Link href={`/products?category-${cat.toLowerCase()}`}>
        
        </Link>
    </li>
))}
  </ul>
  
</div>
)}
</div>

  <div className={styles["brand nav-group"]}>
<button className={styles["Brand buttom"]} onClick={()=>
  toggleMenu('brands')
}>Brands</button>
{OpenMenu === 'brands' &&( 
<div className={styles["lists"]}>

  
  <ul className={styles["brand-list lists"]}>
    <li><Link href="/GUCCI">GUCCI
  
    </Link>
    </li>
    <li><Link href="/PRADA">PRAD
    
  
    </Link>
    </li>
    <li><Link href="/VERSACI">VERSACE
    
 
    </Link>
    </li>
    <li><Link href="/FASIONOVA">FASIONOVA
    
   
    </Link>
    </li>
  </ul>
</div>
)}
</div>


</div>




)
}