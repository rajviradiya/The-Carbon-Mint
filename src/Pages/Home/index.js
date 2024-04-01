import React, { useEffect, useState } from "react";
import FarmerDeailcard from "./Components/FarmerDeailcard";
import Nav from "./Components/Nav";
import "./Homepage.css";
import CropCard from "./Components/CropCard";
import EventCard from "./Components/EventCard";
import { useFierbase } from "../../context/fierbasecontext";
import { Link } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { MdOutlineUploadFile } from "react-icons/md";
import { FiWifiOff } from "react-icons/fi";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Index1 = () => {
  const firebase = useFierbase();
  const [snackbar, setSnackbar] = useState(false)
  const [timeout, setTimeOut] = useState(false)
  const ProcessArray = firebase.uploadProgress

  useEffect(() => {
    if ((firebase?.AllImageUpload !== 100 && firebase?.AllImageUpload !== undefined) && ProcessArray.length > 0) {
      setSnackbar(true)
    } else (
      setSnackbar(false)
    )
  }, [firebase?.AllImageUpload])

  useEffect(() => {
    setTimeout(() => {
      if (snackbar === false) {
        setTimeOut(true)
      }
    }, 3000);
  }, [snackbar])

  // const data = [...(firebase?.userdata?.event)].reverse();//reverse Event data

  //close snackbar  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    firebase.setOpen(false);
  };

  //Fin id In Local Storage
  const ProcessId = JSON.parse(localStorage.getItem("progress"))
  console.log(ProcessId,"process1")

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
                <EventCard items={items} process={firebase?.AllImageUpload} iddata={ProcessId[items.id]} internet={firebase.internet} />
              }
            </Link>
          </>
        ))}
      </section>
      <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
        {firebase?.internet ? (
          <Snackbar open={firebase.open} autoHideDuration={3000} onClose={handleClose}>
            <Alert icon={<FiWifiOff />} sx={{ zIndex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', width: "90%", position: "fixed", top: "85%", boxShadow: "0px 0px 6px gray" }} severity="error">
              No internet connection. Photos will be uploaded when internet connection is stable.
            </Alert>
          </Snackbar>
        ) :
          (snackbar ? (
            <Snackbar open={firebase.open} autoHideDuration={3000} onClose={handleClose}>
              <Alert icon={<MdOutlineUploadFile />} sx={{ zIndex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', width: "90%", position: "fixed", top: "85%", boxShadow: "0px 0px 6px gray" }}>
                Photo upload in progress...
              </Alert>
            </Snackbar>
          ) : (timeout ? (<></>) :
            (
              <Alert icon={<CheckCircleOutlineIcon />} sx={{ zIndex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', width: "90%", position: "fixed", top: "85%", boxShadow: "0px 0px 6px gray" }}>
                Crop photos have been uploaded successfully.
              </Alert>)
          ))
        }
      </section>
    </section>
  );
};

export default Index1;
