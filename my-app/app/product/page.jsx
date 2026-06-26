"use client";
 
import styles from './page.module.css';
import Link from "next/link";
import Image from 'next/image';
import { useState, useEffect } from 'react';

// Static Image Imports
import Old from '../images/old.jpg';
import Formal from '../images/formal.jpg';
import Casual from '../images/casual.jpg';
import Classic from '../images/classic.jpg';
import Modern from '../images/modern.jpg';
import Vintage from '../images/vintage.jpg';
import Informal from '../images/informal.jpg';
import Culture from '../images/culture.jpg';


export default function LinkPage() { 
  const [categories, setcategories] = useState([]);

  return (
    <div className={styles['main-container']}>

      {/* Background Video element */}
      <video  
        src="/plants.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline 
        className={styles['background-videos']} 
      />
      <div className={styles['overlay1']}></div>

      {/* Header Container */}
      <div className={styles['header']}>
        <Link href="/main">
       
          <div className={styles['logo-container']}>
            <h3>VIEUX</h3> 
            <img src="/plant-wilt-solid-full.svg" alt="Home icon" className={styles['icon']}/>  
          </div>
        </Link>
      </div>

      {/* Categories Navigation Grid */}
      <div className={styles['image-container']}>
        <div className={styles['container']}>

          {/* CLASSIC */}
          <Link href="/categories/classic">
            <div className={styles['contain']}>
              <div className={styles['overlay']}>CLASSIC</div>
              <Image src={Classic} alt="Classic collection" placeholder="blur" />
            </div>
          </Link>

          {/* OLD SCHOOL */}
          <Link href="/categories/old-school"> 
            <div className={styles['contain']}>
              <div className={styles['overlay']}>OLD-SCHOOL</div>
              <Image src={Old} alt="Old school collection" placeholder="blur" />
            </div>
          </Link>

          {/* VINTAGE */}
          <Link href="/categories/vintage">
            <div className={styles['contain']}>
              <div className={styles['overlay']}>VINTAGE</div>
              <Image src={Vintage} alt="Vintage collection" placeholder="blur" />
            </div>
          </Link>

          {/* MODERN */}
          <Link href="/categories/modern">
            <div className={styles['contain']}>
              <div className={styles['overlay']}>MODERN</div>
              <Image src={Modern} alt="Modern collection" placeholder="blur" />
            </div>
          </Link>

          {/* CULTURAL */}
          <Link href="/categories/cultural">
            <div className={styles['contain']}>
              <div className={styles['overlay']}>CULTURAL</div>
              <Image src={Culture} alt="Cultural collection" placeholder="blur" />
            </div>
          </Link>

          {/* CASUAL */}
          <Link href="/categories/casual">
            <div className={styles['contain']}>
              <div className={styles['overlay']}>CASUAL</div>
              <Image src={Casual} alt="Casual collection" placeholder="blur" />
            </div>
          </Link>

          {/* FORMAL */}
          <Link href="/categories/formal">
            <div className={styles['contain']}>
              <div className={styles['overlay']}>FORMAL</div>
              <Image src={Formal} alt="Formal collection" placeholder="blur" />
            </div>
          </Link>

          {/* INFORMAL */}
          <Link href="/categories/informal">
            <div className={styles['contain']}>
              <div className={styles['overlay']}>INFORMAL</div>
              <Image src={Informal} alt="Informal collection" placeholder="blur" />
            </div>
          </Link>

        </div>
      </div>

      <button className={styles['path']}>path</button>
    </div>
  );
}