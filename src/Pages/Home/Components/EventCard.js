import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { PiImages } from "react-icons/pi";
import { useFierbase } from "../../../context/fierbasecontext";
import Progress from "../../../Components/Progress";
import LinearProgressbar from "./LinearProgress";

const EventCard = ({items}) => {

  const fierbase = useFierbase()

  console.log(fierbase.percentagessum,"sum of all")
  return (
    <Container className="eventcont mt-2">
      <div className="Eventcard">
        <div className="eventpart1">
          {/* <img src={items?.eventimg[0]} alt="Event"/> */}
        </div>
        <div className="eventpart2">
          <span >{items?.date},{items?.time}</span>
          <p>Photos waiting to be upload</p>
          <LinearProgressbar process={fierbase.percentagessum}/>
        </div>
        <dvi className="eventpart3">
          <PiImages className="eventicon" />
        </dvi>
      </div>
    </Container>
  );
};

export default EventCard;
