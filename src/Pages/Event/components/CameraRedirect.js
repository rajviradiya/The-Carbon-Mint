import React, { useCallback, useRef } from 'react'
import Webcam from 'react-webcam';
import { useFierbase } from '../../../context/fierbasecontext';
import { useNavigate } from 'react-router';
import { BsFillCameraFill } from "react-icons/bs";
import CloseNavRedirect from './CloseNavRedirect';

const CameraRedirect = () => {
    const webcamRef = useRef(null)
    const fierbase = useFierbase();
    const navigate = useNavigate();

    const capturePhoto = useCallback(async () => {
        //blob obj
        const imageSrc = webcamRef.current.getScreenshot();
        const base64Part = imageSrc?.split(',')[1];
        
        if (base64Part) {
            const bytes = atob(base64Part);
            
            const byteNumbers = new Array(bytes.length);
            for (let i = 0; i < bytes.length; i++) {
                byteNumbers[i] = bytes.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'image/jpeg' });
            
            fierbase.setImageUrl(prevUrls => [...prevUrls, blob])
            navigate("/event")
        } else {
            console.error("Base64 part not found in image source");
        }
    }, [webcamRef])

    const onUserMedia = (e) => {
        console.log(e)
    }

    return (
        <div className='camrearedirectpage'>
            <CloseNavRedirect />
            <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                onUserMedia={onUserMedia}
                mirrored={true}
                style={{ width: "100vw", height: "75vh" }}
            />
            <div className='camerafooter'>
                <button onClick={capturePhoto} className=''><BsFillCameraFill /></button>
            </div>
        </div>
    )
}

export default CameraRedirect
