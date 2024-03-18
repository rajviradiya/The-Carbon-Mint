import React from 'react'
import EventDetailsNav from './components/EventDetailsNav'
import "./EventDetails.css"
import Progress from '../../Components/Progress'
import AlertBoxSuccess from '../../Components/AlertBoxSuccess';
import WaitingPhotoComp from '../../Components/WaitingPhotoComp';

const Index = () => {
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
