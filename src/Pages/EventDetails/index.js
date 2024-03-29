import React from 'react'
import EventDetailsNav from './components/EventDetailsNav'
import "./EventDetails.css"
import Progress from '../../Components/Progress'
import AlertBoxSuccess from '../../Components/AlertBoxSuccess';
import WaitingPhotoComp from '../../Components/WaitingPhotoComp';
import { useParams } from 'react-router-dom';
import { useFierbase } from '../../context/fierbasecontext';
import Pictures from './components/Pictures';

const Index = () => {
  const params = useParams()
  const firebase = useFierbase()
  const data2 = firebase?.userdata?.event?.filter((items) => items.id === params.id)

  if (!data2) {
    return "Loding ...."
  }

  return (
    <section>
      <section>
        <EventDetailsNav />
      </section>
      <section>
        {firebase.internet ? (<WaitingPhotoComp />) : (firebase?.AllImageUpload !== 100 ? (<Progress />) : (<AlertBoxSuccess />))}
      </section>
      <section>
        <Pictures data={data2} process={firebase?.uploadProgress} />
      </section>
      <section className="container cameratext note">
        <p>Note</p>
        <span>{data2[0]?.description}</span>
      </section>
    </section>
  )
}

export default Index
