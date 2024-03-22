import React, { useEffect, useRef, useState } from 'react'
import EventDetailsNav from './components/EventDetailsNav'
import "./EventDetails.css"
import Progress from '../../Components/Progress'
import AlertBoxSuccess from '../../Components/AlertBoxSuccess';
import WaitingPhotoComp from '../../Components/WaitingPhotoComp';
import { useParams } from 'react-router-dom';
import { useFierbase } from '../../context/fierbasecontext';
import Pictures from './components/Pictures';

const Index = () => {

  const [upload, setUpload] = useState("success")

  const params = useParams()
  const firebase = useFierbase()
  const fileref = useRef()  
  
  useEffect(() => {
    if (firebase.error)
      console.log("errror")
    setUpload("error")
  }, [])

  useEffect(() => {
    setUpload("upload")
  }, [])

  useEffect(() => {
    setInterval(() => {
      setUpload("success")
    }, [2000])
  }, [])

  const data2 = firebase?.userdata?.event.filter((items) => items.id === params.id) 
  console.log(params, "params")
  

  const handlefile = (e)=>{
    firebase.setfile([...e.target.files])
  }

  console.log(firebase.file,"filesssssss")
  
  return (
    <section>
      <section>
        <EventDetailsNav />
      </section>
      <section>
        {upload === "error" ? (<WaitingPhotoComp />) : (upload === "success" ? (<AlertBoxSuccess />) : (<Progress />))}
      </section>
      <section>
        <Pictures params={params} data={firebase?.userdata?.event}/>
      </section>
      <section>
        <p>Note</p>
        <span>{data2[0].description}</span>
      </section>
      <section>
        <input type='file' inputref={fileref} multiple onChange={handlefile}/>
      </section>
    </section>
  )
}

export default Index
