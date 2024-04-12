import React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const LinearProgressbar = ({ process }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" value={process} />
    </Box>
  );
}

export default LinearProgressbar;