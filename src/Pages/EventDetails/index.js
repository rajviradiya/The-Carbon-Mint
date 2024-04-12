import React from 'react'
import EventDetailsNav from './components/EventDetailsNav'
import "./EventDetails.css"
import Progress from '../../Components/Progress'
import AlertBoxSuccess from '../../Components/AlertBoxSuccess';
import WaitingPhotoComp from '../../Components/WaitingPhotoComp';
import { json, useParams } from 'react-router-dom';
import { useFierbase } from '../../context/fierbasecontext';
import Pictures from './components/Pictures';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const Index = () => {
  const params = useParams()
  const firebase = useFierbase()
  const data2 = firebase?.multipleLandParcel?.event?.filter((items) => items.id === params.id)
  const ProcessArray = JSON.parse(localStorage.getItem("progress"))

  const SumProcess = ProcessArray[params.id]?.reduce((acc, cval) => acc + cval.process, 0)
  const totalPossibleProgress = ProcessArray[params.id]?.length * 100;
  const AllImageUpload = (SumProcess / ProcessArray) * 100 || 100;

  if (!data2) {
    return (
      <Stack spacing={1} sx={{ "display": "flex", "flexDirection": "column", "justifyContent": "center", "alignItems": "center" }}>
        <Skeleton variant="text" width={"90vw"} sx={{ fontSize: '2rem' }} />
        <Skeleton variant="rectangular" width={"90vw"} height={"20vh"} />
        <Skeleton variant="rectangular" width={"90vw"} height={"40vh"} />
      </Stack>
    )
  }

  return (
    <section>
      <section>
        <EventDetailsNav />
      </section>
      <section>
        {firebase.internet ? (AllImageUpload !== 100 ? (<Progress process={firebase.AllImageUpload} />) : (<AlertBoxSuccess />)) : (<WaitingPhotoComp />)}
      </section>
      <section>
        <Pictures data={data2} localprocessdata={ProcessArray[params.id]} />
      </section>
      <section className="container cameratext note">
        <p>Note</p>
        <span>{data2[0]?.description}</span>
      </section>
    </section>
  )
}

export default Index
