import React from 'react'
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Container from '@mui/material/Container';

const AlertBoxSuccess = () => {
  return (
    <Container sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Alert sx={{
        backgroundColor: "#EBFAEF !important",
        borderRadius: "20px",
        alignItems: "center",
        height:"30vw"
      }}
        icon={<CheckCircleOutlineIcon sx={{ fontSize: "10vw", fontWeight: "200" }} />}>
        <Typography component="span" sx={{ color: "#363537", fontSize: "5vw", fontWeight: "600" }}>
          Success
        </Typography>
        <Typography component="p" sx={{ color: "#585758", fontSize: "4vw" }}>
          Crop photos have been uploaded successfully.
        </Typography>
      </Alert>
    </Container>
  )
}

export default AlertBoxSuccess
