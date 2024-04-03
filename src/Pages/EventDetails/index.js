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
  const data2 = firebase?.userdata?.event?.filter((items) => items.id === params.id)
  const localprocessdata = JSON.parse(localStorage.getItem("progress"))

  const SumProcess = localprocessdata[params.id]?.reduce((acc, cval) => acc + cval.process, 0)
  const totalPossibleProgress = localprocessdata[params.id]?.length * 100;
  const AllImageUpload = (SumProcess / totalPossibleProgress) * 100;
  console.log(data2, localprocessdata, SumProcess, totalPossibleProgress, AllImageUpload, "process3")

  console.log(data2,localprocessdata[params.id],"Eventpage Data") 

  if (!data2) {
    return (
      <Stack spacing={1}>
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />
      </Stack>
    )
  }

  return (
    <section>
      <section>
        <EventDetailsNav />
      </section>
      <section>
        {firebase.internet ? (AllImageUpload!== 100 ? (<Progress process={firebase.AllImageUpload}/>) : (<AlertBoxSuccess />)):(<WaitingPhotoComp />)}
      </section>
      <section>
        <Pictures data={data2} localprocessdata={localprocessdata[params.id]} />
      </section>
      <section className="container cameratext note">
        <p>Note</p>
        <span>{data2[0]?.description}</span>
      </section>
    </section>
  )
}

export default Index
