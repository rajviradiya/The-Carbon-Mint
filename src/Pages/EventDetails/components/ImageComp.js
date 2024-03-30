import React from 'react'
import { MdDone } from "react-icons/md";
import CircularProgress from '@mui/material/CircularProgress';

const ImageComp = ({ image, process }) => {
  return (
    <div class="image-container mb-2">
      <img src={image} alt="EventImg" />
      <div class="processdiv" >
        {process && process?.process ? (process?.process !== 100 ? (
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
        ) : (
          <MdDone />
        )}
      </div>
    </div>
  )
}

export default ImageComp
