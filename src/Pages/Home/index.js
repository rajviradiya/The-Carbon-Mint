import React, { useEffect, useState } from "react";
import FarmerDeailcard from "./Components/FarmerDeailcard";
import Nav from "./Components/Nav";
import "./Homepage.css";
import CropCard from "./Components/CropCard";
import EventCard from "./Components/EventCard";
import { useFierbase } from "../../context/fierbasecontext";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { MdOutlineUploadFile } from "react-icons/md";
import { FiWifiOff } from "react-icons/fi";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const Index1 = () => {
  const firebase = useFierbase();
  const [timeout, setTimeOut] = useState(false)
  const ProcessArray = JSON.parse(localStorage.getItem("progress"))

  useEffect(() => {
    setTimeout(() => {
      if (firebase.open === false) {
        setTimeOut(true)
      }
    }, 3000);
  }, [firebase.open])

  useEffect(()=>{
    if(firebase.open === false){
      setTimeOut(true)
    }
  },[])
  if (!firebase?.userdata) {
    return (
      <Stack spacing={1}>
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />
      </Stack>
    )
  }
  // console.log(dataa,data,"dtaa reverse")
  //close snackbar  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    firebase.setOpen(false);
  };

  //Fin id In Local Storage
  console.log(firebase?.userdata?.event, ProcessArray, "process1")

  return (
    <section className="homepagemain">
      <section className="Navmain">
        <Nav />
      </section>
      <section className="farmerdetailmain">
        <FarmerDeailcard />
      </section>
      <section className="cropcardmain">
        <span className="croptitle">Crops</span>
        <>
          {firebase?.userdata?.crops?.map((items) => (
            <>
              <CropCard items={items} />
            </>
          ))}
        </>
      </section>
      <section className="EventMain">
        <span className="croptitle">Events</span>
        {firebase?.userdata?.event?.map((items, index) => (
          <>
            <Link key={index} to={`/eventdetails/${items.id}`} style={{ textDecoration: "none" }}>
              {
                <EventCard eventdata={items} Localprocessdata={ProcessArray[items.id]} internet={firebase?.internet} />
              }
            </Link>
          </>
        ))}
      </section>
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
  );
};

export default Index1;
