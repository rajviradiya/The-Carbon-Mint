import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import { useFierbase } from '../../../context/fierbasecontext';
import { v4 as uuid } from 'uuid';

const LinearProgressbar = ({ process }) => {
  const fierbase = useFierbase()


  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" value={process} />
      {/* {process < 100 ? (
        <LinearProgress variant="determinate" value={process} />
      ) : (
        <CheckCircleOutline sx={{ width: 60, height: 60, color: "lightgreen" }} />
      )
      } */}
    </Box>
  );
}

export default LinearProgressbar;