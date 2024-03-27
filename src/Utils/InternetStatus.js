import React, { useState, useEffect } from 'react';
import { FiWifiOff } from "react-icons/fi";

const InternetStatus = (props) => {
    const [isOnline, setOnline] = useState(true);

    useEffect(() => {
        setOnline(navigator.onLine)
    }, [])
    
    const handereloade = ()=>{
        window.location.reload();
    }
    
    window.addEventListener('online', () => {
        setOnline(true)
    });

    window.addEventListener('offline', () => {
        setOnline(false)
    });

    if (isOnline) {
        return (
            props.children
        )
    } else {
        return (
            <div className='container' style={{height:"100vh",width:"100vw",backgroundColor:"#F9F9F9",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                <div style={{fontSize:"15vw",color:"#EF2D56"}}>
                    <FiWifiOff />
                </div>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                    <p style={{margin:"0px",fontSize:"6vw",fontWeight:"600"}}>No internet connection.</p>
                    <span style={{fontSize:"4.5vw", textAlign:"center",fontWeight:"400"}}>No internet connection. Please turn on WiFi or Mobile data.</span>
                    <button style={{backgroundColor:"transparent",border:"none",marginTop:"4vw", color:"#2B9348",fontSize:"5vw",fontWeight:"600"}} onClick={()=>{handereloade()}}>Retry</button>
                </div>
            </div>
        )
    }
}

export default InternetStatus;