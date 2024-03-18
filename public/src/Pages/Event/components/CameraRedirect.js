import React, { useCallback, useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam';
import { useFierbase } from '../../../context/fierbasecontext';

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

const CameraRedirect = () => {
    const webcamRef = useRef(null)

    const fierbase = useFierbase()

    useEffect(()=>{
        const data = fierbase.readdata("/users/yL7IvZOz7BSU2xzsmKAfME69M0t1")
        console.log(data,"data is this ")
    },[])
    
    const capturePhoto = useCallback(async () => {
        const imageSrc = webcamRef.current.getScreenshot()
        fierbase.setImageUrl(prevUrls => [...prevUrls, imageSrc])
    }, [webcamRef])

    const onUserMedia = (e) => {
        console.log(e)
    }

    console.log(fierbase.imageurl, "url is this ")
    return (
        <>
            <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                onUserMedia={onUserMedia}
                mirrored={true}
            />
            <button onClick={capturePhoto}>Capture Photo</button>
            <button onClick={() => fierbase.setImageUrl(null)}>Refresh</button>

            {fierbase.imageurl && fierbase.imageurl.map((item) => (
                <div>
                    <img src={item} alt="ScreeenShot" />
                </div>
            ))}
        </>
    )
}

export default CameraRedirect
