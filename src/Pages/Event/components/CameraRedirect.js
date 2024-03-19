import React, { useCallback, useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam';
import { useFierbase } from '../../../context/fierbasecontext';
import { useNavigate } from 'react-router';
import CloaseNav from './CloaseNav';
import { BsFillCameraFill } from "react-icons/bs";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

const CameraRedirect = () => {
    const webcamRef = useRef(null)

    const fierbase = useFierbase();
    const navigate = useNavigate();

    const capturePhoto = useCallback(async () => {
        const imageSrc = webcamRef.current.getScreenshot()
        fierbase.setImageUrl(prevUrls => [...prevUrls, imageSrc])
        navigate("/event")
    }, [webcamRef])

    const onUserMedia = (e) => {
        console.log(e)
    }

    const handleClosenav = () => {
        navigate("/event")
    }

    console.log(fierbase.imageurl, "url is this ")
    return (
        <div className='camrearedirectpage'>
            <CloaseNav handleClosenav={handleClosenav} className="closenav"/>
            <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                onUserMedia={onUserMedia}
                mirrored={true}
            />
            <div className='camerafooter'>
                <button onClick={capturePhoto} className=''><BsFillCameraFill /></button>
            </div>
        </div>
    )
}

export default CameraRedirect
