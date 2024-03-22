import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import { useFierbase } from '../context/fierbasecontext';
import { v4 as uuid } from 'uuid';

const LinearProgressbar = () => {
  const [progress, setProgress] = useState(10);
  const [imageurl, setimageurl] = useState(null) //get it to fierbae

  const fierbase = useFierbase()

  // useEffect(() => {
  //   fierbase.upload()
  // }, [])

  // useEffect(() => {
  //   const uploadImage = async () => {
  //     const imagename = uuid() + "." + "raj"
  //     try {
  //       const url = await fierbase.uploadfileProgress(
  //         fierbase.imageurl[0],
  //         `images`,
  //         imagename,
  //         setProgress
  //       )
  //         console.log(url)
  //     } catch (error) {
  //       alert(error.message)
  //       console.log(error)
  //     }
  //   }
  //   uploadImage()
  // }, [])

  console.log(fierbase.file, "file data ")
  console.log(imageurl, "manual dtata og first imagearray !!!!!!!!!!!!!")
  console.log(fierbase.userdata.event[0].eventimg, "manual dtata og first imagearray !!!!!!!!!!!!!")

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((oldProgress) => {
  //       if (oldProgress === 100) {
  //         return 0;
  //       }
  //       const diff = Math.random() * 10;
  //       return Math.min(oldProgress + diff, 100);
  //     });
  //   }, 500);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  return (
    <Box sx={{ width: '100%' }}>
      {progress < 100 ? (
        <LinearProgress variant="determinate" value={progress} />
      ) : (
        <CheckCircleOutline sx={{ width: 60, height: 60, color: "lightgreen" }} />
      )

      }
    </Box>
  );
}

export default LinearProgressbar;