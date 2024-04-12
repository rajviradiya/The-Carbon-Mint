import React from 'react'
import NotificationComp from './Components/NotificationComp'
import { useFierbase } from '../../context/fierbasecontext'
import "./Notification.css"
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const Index = () => {
  const firebase = useFierbase();

  if (!firebase?.multipleLandParcel) {
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
    <section className='NotificationMain'>
      {
        firebase?.multipleLandParcel?.event?.reverse()?.map((item, index) => {
          return (<>
            <NotificationComp item={item} />
          </>)
        })
      }
    </section>
  )
}

export default Index;