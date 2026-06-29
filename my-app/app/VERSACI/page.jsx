"use client";

import styles from './page.module.css';
import Link from "next/link"; 
export default function Versaci(){
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
        <p>VERSACI HAS YET TO BE CREATED</p>
        <Link href="/archieve"  className={styles['return']}><button>RETURN TO ARHCIVE</button></Link>
        </div>
      </div>

)




 }



