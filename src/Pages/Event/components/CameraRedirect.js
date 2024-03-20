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
        const imageSrc = webcamRef.current.getScreenshot()
        fierbase.setImageUrl(prevUrls => [...prevUrls, imageSrc])
        navigate("/event")
    }, [webcamRef])

    const onUserMedia = (e) => {
        console.log(e)
    }

    console.log(fierbase.imageurl, "url is this ")
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
