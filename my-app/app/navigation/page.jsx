"use client";

import { useState } from 'react';
import Link from "next/link";

export default function Navigate(){
  const [isopen, setisopen]= useState(false)
  return( 
            <div className="shell">
  <button onClick={()=> setisopen(!isopen)} >{ 
          isopen ? <img src="x.svg" alt="" className="close" /> : <img src="/bar.svg" alt="" className="bars"/> } </button>
    <div className={isopen ? 'navigate active' : 'navigate'}>

 <span className="list-item" onClick={()=> setisopen(false)}>
<Link href="/main"><img src="plant-wilt-solid-full.svg" alt="home.svg" className="image-icon" /></Link>
    </span>

<span className="list-itemed"onClick={()=> setisopen(false)}>
      <Link href="/product">        <img src="gear.svg" alt="" className="icon" /></Link>
    </span>


  <ul className="list">
    <li className="list-items" onClick={()=> setisopen(false)}>

<Link href="/">   <img src="home.svg" alt="home.svg" className="image-icon" />Home</Link>

    </li>
    <li className="list-items" onClick={()=> setisopen(false)}>

      <Link href="/about">        <img src="help.svg" alt="" className="image-icon" />About</Link>
    </li>
    <li className="list-items"onClick={()=> setisopen(false)}>
        
      <Link href="/contact"> <img src="contact.png" alt="" className="image-icon" />Contact</Link>
    </li>
    <li className="list-items"onClick={()=> setisopen(false)}>
 
      <Link href="/product">        <img src="product.svg" alt="" className="image-icon" />Collection</Link>
    </li>
  </ul>
 

</div>


</div>
  )
}