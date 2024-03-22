import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { MdOutlineUploadFile } from "react-icons/md";
import Container from '@mui/material/Container';

function LinearProgressWithLabel(props) {
  return (
    <Container sx={{}}>
      <Box sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', height: "25vw", backgroundColor: "#EBFAEF !important", borderRadius: "20px" }}>
        <Box sx={{ width: "20%", display: "flex", justifyContent: "center" }}>
          <MdOutlineUploadFile style={{ fontSize: "10vw", fontWeightg: "600", color: "#2B9348" }} />
        </Box>
        <Box sx={{ width: '80%',padding:"0 6vw 0 0 " }} >
          <Typography sx={{ fontSize: "5vw", fontWeight: "600" }}>Photo upload</Typography>
          <div style={{display:"flex"}}>
            <Typography sx={{width:"88%", fontSize: "4vw" }}>Photo upload in progress...</Typography>
            <Typography sx={{width:"12%",color:"#2B9348", fontWeight:"600"}} variant="body2" color="text.secondary">{`${Math.round(
              props.value,
            )}%`}</Typography>
          </div>
          <Typography>
            <LinearProgress variant="determinate" {...props} />
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

const Progress = () => {
  const [progress, setProgress] = React.useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
};

export default Progress;
