"use client";

import Link from "next/link";
import { useState } from 'react';
export default function Home() {
        const categories = ["CLASSIC","OLD-SCHOOL","VINTAGE","MODERN","CULTURAL","CASUAL","FORMAL","INFORMAL"]

        
            
const [OpenMenu,setOpenMenu]= useState(null);

const toggleMenu = (menuName) => { 
  if(OpenMenu === menuName){
    setOpenMenu(null)
  }else{
    setOpenMenu(menuName)
  }
}


  return (

   <div className="home">   
<video  src={"/vid.mp4"}
autoPlay 
loop muted 
playsInline 
className="background-video" />
<div className="overlay"></div>

<div className="image">
  <img src="/dark.png" alt="" className="dark" />
</div>
    <div className="one">
      <h1>Welcome To VIEUX</h1></div>
  
   
<div className="details-rows">
<div className="cat nav-group">

<button className="categ buttom" onClick={()=>
  toggleMenu('categgories')
}>CATEGORIES</button>
{OpenMenu === 'categgories' &&( 
 <div className="lists">
  <ul className="category-list lists">
     <li> <Link href="/archieve">ALL</Link> </li>
  
  {categories.map((cat) => (
            <li key={cat}>
              <Link href={`/categories/${cat.toLowerCase().replace(' ', '-')}`}>
                {cat}
              </Link>
            </li>
          ))}
  </ul>
  
</div>
)}
</div>

  <div className="brand nav-group">
<button className="Brand buttom" onClick={()=>
  toggleMenu('brands')
}>Brands</button>
{OpenMenu === 'brands' &&( 
<div className="lists">

  
  <ul className="brand-list lists">
   

    <li>
        <Link href="/GUCCI">
      GUCCI
        </Link>
    </li>
      <li>
        <Link href="/FASIONOVA">
        FASIONOVA
        </Link>
    </li>
      <li>
        <Link href="/VERSACI">
      VERSACI
        </Link>
    </li>
      <li>
        <Link href="/PRADA">
      PRADA
        </Link>
    </li>

  </ul>
</div>
)}
</div>





</div>



<div className="visits">
   <Link href="/main" >

 
  
  Visit  </Link>
</div>





<div className="highlights">
    <h2>Hilights</h2>
</div>
<div className="hero-imges">
   
<div className="image-heros">
    <img src="style.jpg" alt="Suite 2" />
     <div className="cont">
    <div className="spans">
    <span>Name: STYLISH SUIT</span>
    <span>Price: $2000</span>
    </div>
      <div className="tails">
        <span></span>
    <span></span>
    <span></span></div>
    </div>
    </div>
<div className="image-heros">
    <img src="pex3.jpg" alt="Suite 3" />
    <div className="cont">
    <div className="spans">
    <span>Name: CLASSY SUIT</span>
    <span>Price: $2000</span>
    </div>
      <div className="tails">
        <span></span>
    <span></span>
    <span></span></div>
</div>
</div>



</div>
<button className="path">way</button>
</div>
  );
}
