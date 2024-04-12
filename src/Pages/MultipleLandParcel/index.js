import React, { useEffect, useState } from 'react'
import LandParcel from "./Components/LandParcel"
import "./MultipleLandParcel.css"
import { useFierbase } from '../../context/fierbasecontext'
import "./Homepage.css";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { MdOutlineUploadFile } from "react-icons/md";
import { FiWifiOff } from "react-icons/fi";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Index = () => {
    const firebase = useFierbase()
    console.log(firebase?.multipleLandParcel?.LandParcels, "firebase multi land")

    const [timeout, setTimeOut] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            if (firebase.open === false) {
                setTimeOut(true)
            }
        }, 3000);
    }, [firebase.open])

    useEffect(() => {
        if (firebase.open === false) {
            setTimeOut(true)
        }
    }, [])

    //close snackbar  
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        firebase.setOpen(false);
    };

    if (!firebase?.multipleLandParcel?.LandParcels) {
        return (
            <Stack spacing={1} sx={{ "display": "flex", "flexDirection": "column", "justifyContent": "center", "alignItems": "center" }}>
                <Skeleton variant="text" width={"90vw"} sx={{ fontSize: '2rem' }} />
                <Skeleton variant="rectangular" width={"90vw"} height={"15vh"} />
                <Skeleton variant="rectangular" width={"90vw"} height={"25vh"} />
                <Skeleton variant="rectangular" width={"90vw"} height={"40vh"} />
            </Stack>
        )
    }


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (current, next) => {
            localStorage.setItem('currentSlide', next);
        },
        initialSlide: Math.min(localStorage.getItem('currentSlide') || 0),
    };

    return (


        <section className='container-fluid p-0'>
            <div className='land-parcel-slider'>

                <Slider {...settings} >
                    {
                        firebase?.multipleLandParcel?.LandParcels?.map((item, index) => (
                                <LandParcel landparceldata={item} event={firebase?.multipleLandParcel} />

                        ))
                    }
                </Slider>
            </div>

            {/* <div>
                {
                    firebase?.multipleLandParcel?.LandParcels?.map((item, index) => (
                        <LandParcel landparceldata={item} event={firebase?.multipleLandParcel} />
                    ))
                }
            </div> */}

            <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
                {firebase?.internet ?
                    (firebase.open ?
                        (
                            <Alert icon={<MdOutlineUploadFile />} sx={{ zIndex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', width: "90%", position: "fixed", top: "85%", boxShadow: "0px 0px 6px gray" }}>
                                Photo upload in progress...
                            </Alert>
                        ) :
                        (timeout ? (<></>) :
                            (
                                <Alert icon={<CheckCircleOutlineIcon />} sx={{ zIndex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', width: "90%", position: "fixed", top: "85%", boxShadow: "0px 0px 6px gray" }}>
                                    Crop photos have been uploaded successfully.
                                </Alert>)
                        )
                    ) :
                    (
                        <Snackbar open={firebase.open} autoHideDuration={3000} onClose={handleClose}>
                            <Alert icon={<FiWifiOff />} sx={{ zIndex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', width: "90%", position: "fixed", top: "85%", boxShadow: "0px 0px 6px gray" }} severity="error">
                                No internet connection. Photos will be uploaded when internet connection is stable.
                            </Alert>
                        </Snackbar>
                    )
                }
            </section>
        </section>


    )
}

export default Index
