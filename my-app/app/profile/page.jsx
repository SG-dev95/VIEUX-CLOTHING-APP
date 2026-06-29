export default function Profile() { 
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
        <Link href="/"  className={styles['return']}><button>RETURN TO HOME</button></Link>
        </div>
      </div>



    )
}