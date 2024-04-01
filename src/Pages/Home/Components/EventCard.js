import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { PiImages } from "react-icons/pi";
import LinearProgressbar from "./LinearProgress";
import { useFierbase } from "../../../context/fierbasecontext";

const EventCard = ({ items, process, iddata, internet }) => {
  const [processbarEventCard, setprocessbarEventCard] = useState(false)
  const [processEventCard, setprocessEventCard] = useState(false)

  const firebase = useFierbase()

  const SumProcess = iddata?.reduce((acc,cval)=> acc + cval.process  ,0)
  const totalPossibleProgress = iddata?.length * 100;
  const AllImageUpload = (SumProcess / totalPossibleProgress) * 100;
  console.log(iddata,SumProcess,totalPossibleProgress,AllImageUpload, "process2")

  // useEffect(() => {
  //   if (keys[0] === items.id) {
  //     setprocessbarEventCard(true)
  //   } else (
  //     setprocessbarEventCard(false)
  //   )
  // }, [firebase?.AllImageUpload])

  // useEffect(() => {
  //   if (process !== 100) {
  //     setprocessEventCard(true)
  //   } else (
  //     setprocessEventCard(false)
  //   )
  // }, [firebase?.AllImageUpload])

  // console.log(items, process, internet, keys[0], items.id, "Upload Event")

  return (
    <Container className="eventcont mt-2">
      <div className="Eventcard">
        <div className="eventpart1">
          {/* <img src={items?.eventimg[0]} alt="Event" /> */}
        </div>
        <div className="eventpart2">
          <span >{items?.date},{items?.time}</span>
          {/* {keys[0] === items.id ?
            (
              process !== 100 ? (
                <p>Photos waiting to be upload</p>
              ) : (
                <p>Last photo upload at {items?.date}, {items?.time}</p>
              )
            ) : (
              <p>Last photo upload at {items?.date}, {items?.time}</p>
            )} */}
          {/* 
          {processbarEventCard ? (internet ?
            (
              processEventCard ? (
                <LinearProgressbar process={process} />
              ) : (
                <LinearProgressbar process={process} />
              )
            ) :
            (processEventCard ? (
              <LinearProgressbar process={50} />
            ) : (
              <></>
            ))) : (<></>)
          } */}
              <LinearProgressbar process={AllImageUpload} />

        </div>
        <dvi className="eventpart3">
          <PiImages className="eventicon" />
        </dvi>
      </div>
    </Container>
  );
};

export default EventCard;
