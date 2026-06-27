"use client";
import Discorver from '../discover/page';
import Link from "next/link";
import styles from './page.module.css';
import { useState } from 'react';

export default function Main(){
    const categories = ["CLASSIC", "OLD SCHOOL", "VINTAGE", "MODERN", "CULTURAL", "CASUAL", "FORMAL", "INFORMAL"];

    const [OpenMenu,setOpenMenu]= useState(null);
    
    const toggleMenu = (menuName) => { 
      if(OpenMenu === menuName){
        setOpenMenu(null)
      }else{
        setOpenMenu(menuName)
      }
    }
return(
<div className={styles['main-container']}>


<video  src="./fall.mp4" 
autoPlay 
loop muted 
playsInline 
className={styles['background-videos']} />
<div className={styles['overlay1']}></div>


<div className={styles['header']}>
    <h2 className={styles['header-one']}>VIEUX</h2>
</div>













<div className={styles['mother-heros']}>

<div className={styles['mother-intel']}>

    We persue
    <span className={styles['animated-words']}>
<span>Mastery</span>
<span>elevation</span>
<span>refinement</span>
</span>
</div>






<div className={styles['image']}>
  <img src="./woman.png" alt="" /></div>



</div>

   
<div  className={styles['details-rows']}>
<div  className={styles['cat nav-group']}>

<button  className={styles['categ  buttom']} onClick={()=>
  toggleMenu('categgories')
}>CATEGORIES</button>
{OpenMenu === 'categgories' &&( 
 <div  className={styles['lists']}>
  <ul className={styles['category-list lists']}>
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
)}
</div>

  <div  className={styles['brand nav-group']}>
<button  className={styles['brand buttom']}onClick={()=>
  toggleMenu('brands')
}>Brands</button>
{OpenMenu === 'brands' &&( 
<div  className={styles['lists']}>

  
  <ul  className={styles['brand-list lists']}>
    <li><Link href="/gucci">Gucci
  
    </Link>
    </li>
    <li><Link href="/prada">Prada
    
  
    </Link>
    </li>
    <li><Link href="/versace">Versace
    
 
    </Link>
    </li>
    <li><Link href="/fashionova">Fashionova
    
   
    </Link>
    </li>
  </ul>
</div>
)}
</div>


</div>




<div  className={styles['disco']}>
<h3 className={styles['disco1']}>DISCORVERY</h3>
  </div>

<div className={styles['lists-items']}>



<div className={styles['lists3']}>

  <div className={styles['lists4']}>
<h2 className={styles['lists5']}>
  Discorver </h2 ><p>Our</p>  
  </div>

  
  <div className={styles['lists6']}>
  <p>New</p><p>and</p><p>Elegant</p>
  </div>

  <div className={styles['lists7']}>
  <p>Collection</p>
</div>

<Link href='/categories/VINTAGE'><button className={styles['lists8']}>VIEW</button></Link>
  </div>
 
  < Discorver/>

 </div>






<div className={styles['top-hight']}>
<h3 className={styles['top1']}>
  Top HightLights
</h3>
<p className={styles['top2']}>Explore our fine and beutiful archieve  of different collections of dresses</p>


<div className={styles['hight']}>



<div className={styles['top-images']}>

<div className={styles['one']}>
<img src="./pex2.jpg" alt="" />
 <div className={styles['flow']}>
 <div className={styles['span-contain']}>
    <span>Name: MODERN SUIT</span>
    <span>Price: $2000</span>
    </div>
      <div className="tails">
        <span></span>
    <span></span>
    <span></span></div>
</div>
</div>

<div className={styles['one']}>
<img src="./xels3.jpg" alt="" />
  <div className={styles['flow']}>
    <div className={styles['span-contain']}>
    <span>Name: CLASSY SUIT</span>
    <span>Price: $2000</span>
    </div>
      <div className="tails">
        <span></span>
    <span></span>
    <span></span></div>
</div>
</div>
 <div className={styles['one']}>
<img src="./xels2.jpg" alt="" />
 <div className={styles['flow']}>
 <div className={styles['span-contain']}>
    <span>Name: OFFICE SUIT</span>
    <span>Price: $2000</span>
    </div>
      <div className="tails">
        <span></span>
    <span></span>
    <span></span></div>
</div>
</div>

<div className={styles['one']}>
<img src="xels.jpg" alt="" />
 <div className={styles['flow']}>
     <div className={styles['span-contain']}>
    <span>Name: STYLISH SUIT</span>
    <span>Price: $2000</span>
    </div>
      <div className="tails">
        <span></span>
    <span></span>
    <span></span></div>
</div>
 </div>


</div>

</div>

<Link href="/categories/CASUAL"><button className={styles['item']}>EXPLORE</button></Link>

  </div>

<div className={styles['footer-main']}>
<h2 className={styles['item1']}>EXPLORE</h2>
<div className={styles['footer-group']}>

 <h2>Explore</h2>Our 
  Peronal Collections 
  of Epic
    <span className={styles['footer-spans']}>
<span>Formal </span>
<span>Classic</span>
<span>Vintage </span>
<span>Casual</span>
</span>
</div>












<div className={styles['footer-img']}>
<span className={styles['img-spans']}>
<img src="./stand.jpg "alt=""/>
<img src="./style.jpg "alt=""/>
<img src="./pex2.jpg"alt=""/>
<img src="./pex3.jpg"alt=""/>
</span>



</div>

 
<Link href="/categories/INFORMAL"><button className={styles['img-button']}>Explore</button></Link>


</div>











<button className={styles['path']}></button>
</div>
)
}