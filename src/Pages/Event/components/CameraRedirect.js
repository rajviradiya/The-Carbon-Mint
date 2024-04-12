import React, { useCallback, useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam';
import { useFierbase } from '../../../context/fierbasecontext';
import { useNavigate, useParams } from "react-router-dom";
import { BsFillCameraFill } from "react-icons/bs";
import CloseNavRedirect from './CloseNavRedirect';

const CameraRedirect = () => {
  const webcamRef = useRef(null)
  const firebase = useFierbase();
  const navigate = useNavigate();
  const params = useParams()
  const [crop, setCrop] = useState([]);
  const [landparcel, setLandParcel] = useState([])
  const [landparcel2, setLandParcel2] = useState([])

    //Crop And Landparcel Data
    const getDatabase = () => {
      return new Promise(function (resolve, rejected) {
        if (firebase?.multipleLandParcel) {
          resolve()
        } else {
          rejected()
        }
      })
    }
    getDatabase()
      .then((res) => {
        //For Crop Details Page onlly
        for (let i = 0; i < firebase?.multipleLandParcel?.LandParcels?.length; i++) {
          for (let j = 0; j < firebase?.multipleLandParcel?.LandParcels[i].crops.length; j++) {
            if (firebase?.multipleLandParcel?.LandParcels[i].crops[j].id == params.id) {
              setLandParcel2(firebase?.multipleLandParcel?.LandParcels[i])
              setCrop(firebase?.multipleLandParcel?.LandParcels[i].crops[j])
            }
          }
        }
        //for LandParcel
        for (let i = 0; i < firebase?.multipleLandParcel?.LandParcels?.length; i++) {
          if (firebase?.multipleLandParcel?.LandParcels[i]?.id == params.id) {
            setLandParcel(firebase?.multipleLandParcel?.LandParcels[i])
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })


  console.log(landparcel,landparcel2, crop, params.id, "data222222s")

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

      firebase.setImageUrl(prevUrls => [...prevUrls, blob])
      navigate(`/event/${params.id}`)
    } else {
      console.error("Base64 part not found in image source");
    }
  }, [webcamRef])

  const onUserMedia = (e) => {
    console.log(e)
  }

  return (
    <div className='camrearedirectpage'>
      <CloseNavRedirect params={params} crop={crop} landparcel={landparcel} landparcel2={landparcel2} />
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
