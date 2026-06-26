"use client"

import styles from './page.module.css';
import Link from "next/link";
import { useState } from 'react';
export default function About() {

const [isactive,setisactive]=useState(false)
    
  return (


    <div className={styles['about-container']}>
<video  src="./vide.MP4" 
autoPlay 
loop muted 
playsInline 
className={styles['background-videos']} />
<div className={styles['overlay1']}></div>


    <div className={styles['contain']}>
        <h1 className={styles['head']}>The Story: "Vieux"(Old)</h1>
        </div>
        
<div className={styles['main']}>
<div className={styles['about']}>
<h2 className={styles['philosophy']}>
The Philosophy
</h2>
<p className={styles['about-info']}>
     In an era dominated by the transient and the temporary, Vieux stands as a 
        silent rebellion. Named after the french word for old, our phylosophy is rooted
        in longevity, structure, and the absolute mastery of form. We do not design for 
        seasons; we curate for lifetimes.
</p>
</div>


<div className={styles['image-grid']}>
  
 <img src="./pex3.jpg" alt="" className={['dark']} />
   <img src="./stand.jpg" alt="" className={['dark']} />

</div>


<div className={styles['more-info']}>
    <h2 className={styles['more']}>The Silhouette</h2>
    <p className={styles['info']}>
        
        True elegance demands discipline. From the razor-sharp lines of a perfectly
        structured,expensive-looking suite to the fluid, sweeping grace of an old,rich
        tailored dress, every piece tells a strory of intention. it is the marriage of
        monochrome simplicity and premuim, uncompromising architecture. ... 
    </p>
</div>


<div className={styles['second-grid']}>
    <img src="./pex2.jpg" alt="" className="images image3" />
<img src="./stand.jpg" alt="" className="images image4" /></div>

</div>











<div className={styles['footer-container']}>

<button className={styles['category']} onClick={()=> setisactive(!isactive)}>
    CATEGORIES
</button>

<div className={!isactive ? styles.links:styles.hidden}>

  <ul className={styles['footer-list']}>
    <li><Link href="/categories/CLASSIC">Classic
   
    </Link>
    </li>
    <li><Link href="/categories/CASUAL">👚Casual
   
    </Link>
    </li>
    <li><Link href="//categories/FORMAL">🕴Formal
   
   
    </Link>
    </li>
    <li><Link href="/categories/OLD SCHOOL">Old-Scsool

  
    </Link>
    </li>
    <li><Link href="/categories/MODERN">👗Modern
    
   
    </Link>
    </li>
    <li><Link href="/categories/VINTAGE">Vintage
    
  
    </Link>
    </li>
    <li><Link href="//categories/INFORMAL">Informal
 
   
    </Link>
    </li>
    <li><Link href="/categories/CULTURAL">Cultural
    
   
    </Link>
    </li>
  </ul>




</div>

























</div>







<div className={styles['footer-container1']}>

<button className={styles['brands']} onClick={()=> setisactive(!isactive)}>
BRANDS
</button>

<div className={!isactive ? styles.links1:styles.hidden1}>

  <ul className={styles['footer-listS']}>
    <li><Link href="/classic"> Gucci
   
    </Link>
    </li>
    <li><Link href="/casual">👚Prada
   
    </Link>
    </li>
    <li><Link href="/formal"> Versace
   
   
    </Link>
    </li>
    <li><Link href="/sportswear">Fashionova

  
    </Link>
    </li>

</ul>
</div>
</div>











<div className={styles['needs']}> 
    <button className={styles['help']}>Help</button>
<button className={styles['terms']}>Terms&Policies</button></div>






<button className={styles['path']}></button>
        </div>
        )
        }