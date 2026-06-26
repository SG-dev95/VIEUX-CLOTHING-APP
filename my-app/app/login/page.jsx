"use client";

import { useState } from 'react';
import Link from "next/link";

export default function Login(){
    const [isactive,setisactive] = useState(false);

return(
    
<div className="logins">
  <button className="login" onClick={()=>setisactive(!isactive)}>
    <img src="./profile.svg" alt=""/>
  </button>
  

<div className={` sign ${isactive ? 'active' : ''}`}>
<button className="logins"  onClick={()=>setisactive(false) }>Login</button>
<button className="logins" onClick={()=>setisactive(false) }>Sign up</button>

</div>













    <div className="cart">
   <Link href="/cart"> 
<button><img src="./basket-shopping-solid-full.svg" atl="cart"/></button>
</Link>  
    </div>



</div>
)


}




