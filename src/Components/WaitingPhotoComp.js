import React from 'react'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { PiImages } from "react-icons/pi";
import Typography from '@mui/material/Typography';

const WaitingPhotoComp = () => {
    return (
        <div>
            <Container>
                <Box sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', height: "35vw", backgroundColor: "#FFC9B9 !important", borderRadius: "20px" }} >
                    <Box sx={{ width: "20%", display: "flex", justifyContent: "center" }}>
                        <PiImages style={{ fontSize: "10vw", fontWeightg: "600" }} />
                    </Box>
                    <Box sx={{ width: '80%', padding: "4vw 4vw 4vw 0" }}>
                        <Typography sx={{ fontSize: "4.5vw", fontWeight: "600" }}>
                            Photos waiting to be uploaded
                        </Typography>
                        <Typography sx={{ fontSize: "4vw" }}>
                            No internet connection. Photos will be uploaded when internet connection is stable.
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </div>
    )
}

export default WaitingPhotoComp
