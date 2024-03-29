import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { PiImages } from "react-icons/pi";
import LinearProgressbar from "./LinearProgress";

const EventCard = ({ items, process, Upload, internet }) => {

  console.log(items, process, Upload,"Item Is Like ")
    
  return (
    <Container className="eventcont mt-2">
      <div className="Eventcard">
        <div className="eventpart1">
          <img src={items?.eventimg[0]} alt="Event" />
        </div>
        <div className="eventpart2">
          <span >{items?.date},{items?.time}</span>
          {Upload ?
            (
              process !== 100 ? (
                <p>Photos waiting to be upload</p>
              ) : (
                <p>Last photo upload at {items?.date}, {items?.time}</p>
              )
            ) : (
              <p>Last photo upload at {items?.date}, {items?.time}</p>
            )}
          {Upload ? (internet ?
            (
              process !== 100 ? (
                <LinearProgressbar process={process} />
              ) : (
                <></>
              )
            ) :
            (process !== 100 ? (
              <LinearProgressbar process={50} />
            ) : (
              <></> 
            ))) : (<></>)
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
