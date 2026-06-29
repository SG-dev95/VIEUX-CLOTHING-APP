
import styles from './page.module.css';


export default function Contact(){
return(
<div className={styles['contact-container']}>

<video  src="./rain.mp4" 
autoPlay 
loop muted 
playsInline 
className={styles['background-videos']} />
<div className={styles['overlay1']}></div>

<div className={styles['whole-contain']} >


<div className={styles['form-side']}>
<form id="form" className={styles['form-assec']}>
    <input type="text" placeholder="UserName" className='name' className={styles['names']} />
    <input type="email" placeholder="Email" className='email' className={styles['emails']} />
    <textarea name="message" id="message" placeholder="Enter your message" className={styles['ms-me']}></textarea>

    <button type="submit" className={styles['']}>SEND</button>
</form>
</div>

<div className={styles['philosophy-side']}>
<span className={styles['philosophy-one']}>
In an era of the transient,
let's build something that lasts. 

</span>

<span className={styles['philosophy-two']}>Connect with the rebellion</span>
</div>
</div>






















<button className={styles['path']}>path</button>

</div>
)
}

