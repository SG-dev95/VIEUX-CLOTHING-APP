"use client";
import Link from "next/link";

import styles from './page.module.css';
 
export default function Prada(){
return(
 <div className={styles['container']}>
        
      <video  
        src="/drop.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline 
        className={styles['background-videos']} 
      />
      <div className={styles['overlay1']}></div>
       <div className={styles['tain']}>
        <h3>SORRY</h3>
        <p>PRADA HAS YET TO BE CREATED</p>
        <Link href="/archieve"  className={styles['return']}><button>RETURN TO ARCIEVE</button></Link>
        </div>
      </div>

)




 }



