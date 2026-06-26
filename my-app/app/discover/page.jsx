"use client";
import Link from "next/link";
import styles from './page.module.css';
import { useState,useEffect } from 'react';

 export default function Discorver(){
const clothes = [
    '/stand.jpg',
    '/pex2.jpg',
    '/pex3.jpg'
];

const [currentIndex,setcurrentIndex] = useState(0)

useEffect(() =>{ 
    const timer= setInterval(() => {
      
        setcurrentIndex((prevIndex) =>{
          return  prevIndex === clothes.length-1 ? 0 : prevIndex +1
        })
    }, 4000);

    return () => clearInterval(timer)
    
},[]);


return(


<div className={styles['images-lists']}>
{clothes.map((imageSrc,index) => ( 
<img 
key={imageSrc}
src={imageSrc}
alt="beauty"
className={`${styles.images} ${currentIndex === index ? styles.active : ''}`}/>

))}
    </div>


)

 }