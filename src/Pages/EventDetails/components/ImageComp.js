import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import CircularProgress from '@mui/material/CircularProgress';

const ImageComp = ({ image,process }) => {

  const [progress,setProgress] = useState(null)//circular progrss state 

  console.log(image, "image is this ")


  return (
    <div class="image-container mb-2">
      <img src={image} alt='Image' />
      <div class="processdiv" >  
        <CircularProgress sx={{fontWeight:"900 !important",height:"4vw !important",width:"4vw !important"}} variant="determinate" value={85} /> 
      </div>
    </div>
  )
}

export default ImageComp
