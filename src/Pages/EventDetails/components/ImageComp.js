import React from 'react'
import { MdDone } from "react-icons/md";
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';

const ImageComp = ({ image, index, processmain }) => {

  let process = processmain && processmain[index]

  console.log(process, "data111111")
  return (
    <div class="image-container mb-2">
      {image ? (
        <img src={image} alt="EventImg" />
      ) : (
        <Skeleton variant="rectangular" width={210} height={60} />
      )}
      <div class="processdiv" >
        {process?.process === 100 || process?.process === undefined ? (<MdDone />) : (
          <CircularProgress
            sx={{
              fontWeight: "900 !important",
              height: "4vw !important",
              width: "4vw !important"
            }}
            variant="determinate"
            value={process?.process}
          />
        )
        }
      </div>
    </div>
  )
}

export default ImageComp
