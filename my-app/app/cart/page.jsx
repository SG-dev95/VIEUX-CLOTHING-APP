"use client";

import styles from './page.module.css';
import Link from "next/link";
import { useCart } from '../context/CartContext';

export default function Cart() {

    
  const { cart, addCart, removeCart, clearCart } = useCart();

  const subTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity, 0
  );

  const formattedTotal = Math.round(subTotal * 100) / 100;

  if (cart.length === 0) {
    return (
      <main className={styles['empty']}>
        <h1>YOUR ARCHIVE BAG IS EMPTY</h1>

        <Link href="/product">Return to Products</Link>
      </main>
    );
  }

  return (

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
      <div className={styles['Top-height']}>
        <h3>TOP HIGHLIGHTS</h3>
        <div className={styles['Top-images']}>
          <img src="/pex2.jpg" alt="Highlight design variant 1"/>
          <img src="/xels3.jpg" alt="Highlight design variant 2"/>
          <img src="/xels4.jpg" alt="Highlight design variant 3"/>
        </div>
        
        <Link href="/product">
          <button className={styles['view-btn']}>VIEW COLLECTIONS</button>
        </Link>
      </div>

      <div className={styles['header']}>
        <h1 className={styles['counter']}>
          MY ARCHIVE ({cart.length})
        </h1>
        <button className={styles['header-clear']} onClick={clearCart}>
          CLEAR ALL
        </button>
      </div>

    
      <div className={styles['items-family']}>
        <section className={styles['cart-section']}>
          {cart.map((item) => (
            
            <div key={`${item.id}-${item.selectedSize}`} className={styles['item-section']}>
              
              <div className={styles['item-images']}>
                <img src={item.image} alt={item.name} /> 
              </div>

              <div className={styles['cart-detail']}>
           
                <h3 className={styles['cart-name']}>{item.name}</h3>
                <p className={styles['item-size']}>SIZE: {item.selectedSize}</p>
                <p className={styles['item-quant']}>QUANTITY: {item.quantity}</p>
              </div>

              <div className={styles['item-actions']}>
                <p className={styles['itemPrice']}>${item.price * item.quantity}</p>

                <div className={styles['item-buttons']}>
           
                  <button 
                    onClick={() => removeCart(item.id, item.selectedSize)} 
                    className={styles['removeBtn']}
                  >
                    <img src="/x.svg" alt="Remove item" />
                  </button>

                 
                  <button 
                    className={styles['item-add']} 
                    onClick={() => addCart(item, item.selectedSize)}
                  >
                    <img src="/plus.svg" alt="Increase quantity" />
                  </button>
                </div> 
              </div>

            </div>
          ))}
        </section>


        <footer className={styles['item-footer']}>
          <div className={styles['item-registEr']}>
            <span className={styles['item-sub']}>SUBTOTAL:</span>
            <span className={styles['item-formate']}>${formattedTotal}</span>
          </div>
          <button className={styles['item-to']}>PROCEED TO CHECKOUT</button>
        </footer>

      </div>
    </div>
  );
}