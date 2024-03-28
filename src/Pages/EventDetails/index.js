import React, { useState } from 'react'
import EventDetailsNav from './components/EventDetailsNav'
import "./EventDetails.css"
import Progress from '../../Components/Progress'
import AlertBoxSuccess from '../../Components/AlertBoxSuccess';
import WaitingPhotoComp from '../../Components/WaitingPhotoComp';
import { useParams } from 'react-router-dom';
import { useFierbase } from '../../context/fierbasecontext';
import Pictures from './components/Pictures';

const Index = () => {
  const [upload, setUpload] = useState("progress")

  const params = useParams()
  const firebase = useFierbase()

  const data2 = firebase?.userdata?.event?.filter((items) => items.id === params.id) 
 

  console.log(params, "params")
  console.log(firebase?.uploadProgress, "data eveantdetails")

  if(!data2){
    return "Loding ...."
  }


  return (
    <section>
      <section>
        <EventDetailsNav />
      </section>
      <section>
        {upload === "error" ? (<WaitingPhotoComp />) : (upload === "progress" ? (<Progress />) : (<AlertBoxSuccess />))}
      </section>
      <section>
        <Pictures data={data2} process={firebase?.uploadProgress}/>
      </section>
      <section className="container cameratext note">
        <p>Note</p>
        <span>{data2[0]?.description}</span>
      </section>
    </section>  
  )
}

export default Index
