import React from 'react'
import { MdDone } from "react-icons/md";
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';

const ImageComp = ({ image, process }) => {
  return (
    <div class="image-container mb-2">
      {image ? (
        <img src={image} alt="EventImg" />
      ) : (
        <Skeleton variant="rectangular" width={210} height={60} />
      )}
      <div class="processdiv" >
        {process?.process !== 100 ? (
          <CircularProgress
            sx={{
              fontWeight: "900 !important",
              height: "4vw !important",
              width: "4vw !important"
            }}
            variant="determinate"
            value={process?.process}
          />
        ) : (<MdDone />)
        }
      </div>
    </div>
  )
}

export default ImageComp
