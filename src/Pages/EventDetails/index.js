import React from 'react'
import EventDetailsNav from './components/EventDetailsNav'
import "./EventDetails.css"
import Progress from '../../Components/Progress'
import AlertBoxSuccess from '../../Components/AlertBoxSuccess';
import WaitingPhotoComp from '../../Components/WaitingPhotoComp';
import { useParams } from 'react-router-dom';

const Index = () => {

  const params = useParams()

  console.log(params,"params")
  return (
    <section>
      <section>
        <EventDetailsNav />
      </section>
      <section>
        {/* Process */}
        <Progress />
        {/* Alert */}
        <AlertBoxSuccess/>
        {/* error */}
        <WaitingPhotoComp/>
      </section>
      <section>
        <span>photos</span>
      </section>
      <section>
        <span>Notes</span>
      </section>
    </section>
  )
}

export default Index
