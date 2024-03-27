import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import CircularProgress from '@mui/material/CircularProgress';

const ImageComp = ({ image }) => {

  const [progress,setProgress] = useState(null)//circular progrss state 

  console.log(image, "image is this ")

  const handleclose = () => {

  }
  return (
    <div class="image-container mb-2">
      <img src={"https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"} alt='Image' />
      <div class="processdiv" onClick={() => handleclose()}>
        <CircularProgress sx={{fontWeight:"900 !important",height:"4vw !important",width:"4vw !important"}} variant="determinate" value={85} /> 
      </div>
    </div>
  )
}

export default ImageComp
