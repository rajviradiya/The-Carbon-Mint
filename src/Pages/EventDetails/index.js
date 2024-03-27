import React, { useEffect, useRef, useState } from 'react'
import EventDetailsNav from './components/EventDetailsNav'
import "./EventDetails.css"
import Progress from '../../Components/Progress'
import AlertBoxSuccess from '../../Components/AlertBoxSuccess';
import WaitingPhotoComp from '../../Components/WaitingPhotoComp';
import { useParams } from 'react-router-dom';
import { useFierbase } from '../../context/fierbasecontext';
import Pictures from './components/Pictures';
import { ref } from 'firebase/database';
import { storage } from '../../Config/fierbase';
import { uploadBytes } from 'firebase/storage';
import { v4 as uuid } from 'uuid';

const Index = () => {
  const [upload, setUpload] = useState("progress")

  const params = useParams()
  const firebase = useFierbase()
  const fileref = useRef()  

  // const data2 = firebase?.userdata?.event.filter((items) => items.id === params.id) 
  console.log(params, "params")
  

  const handlefile = (e)=>{
    firebase.setfile([...e.target.files])
  }

  console.log(firebase.file,"file is this ")
  const handleClick = ()=>{
    const filePath = `files/${uuid()}`;
    const fileRef  = ref(storage,filePath);
    const file = firebase.file;
    uploadBytes(fileRef,file)
  }
  console.log(firebase.file,"filesssssss")
                
  return (
    <section>
      <section>
        <EventDetailsNav />
      </section>
      <section>
        {upload === "error" ? (<WaitingPhotoComp />) : (upload === "progress" ? (<Progress />) : (<AlertBoxSuccess />))}
      </section>
      <section>
        <Pictures params={params} data={firebase?.userdata?.event}/>
      </section>
      <section className="container cameratext note">
        <p>Note</p>
        {/* <span>{data2[0].description}</span> */}
      </section>
    </section>
  )
}

export default Index
