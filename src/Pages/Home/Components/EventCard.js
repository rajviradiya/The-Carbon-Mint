import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { PiImages } from "react-icons/pi";
import LinearProgressbar from "./LinearProgress";
import Skeleton from '@mui/material/Skeleton';
import { useFierbase } from "../../../context/fierbasecontext";

const EventCard = ({ eventdata, Localprocessdata, internet }) => {
  const firebase = useFierbase()
  const SumProcess = Localprocessdata?.reduce((acc, cval) => acc + cval.process, 0)
  const totalPossibleProgress = Localprocessdata?.length * 100;
  const AllImageUpload = (SumProcess / totalPossibleProgress) * 100;

  return (
    <Container className="eventcont mt-2">
      <div className="Eventcard">
        <div className="eventpart1">
          {eventdata?.eventimg ? (
            <img src={eventdata?.eventimg[0]} alt="Event" />
          ) : (
            <Skeleton variant="circular" width={40} height={40} />
          )
          }
        </div>
        <div className="eventpart2">
          <span >{eventdata?.date},{eventdata?.time}</span> 
          {AllImageUpload !== 100 ? (
            <p>Photos waiting to be upload</p>
          ) : (
            <p>Last photo upload at {eventdata?.date}, {eventdata?.time}</p>
          )
          }

          {AllImageUpload !== 100 ? (
            <LinearProgressbar process={50} />
          ) : (
            <></>
          )
          }
        </div>
        <dvi className="eventpart3">
          <PiImages className="eventicon" />
        </dvi>
      </div>
    </Container>
  );
};

export default EventCard;
