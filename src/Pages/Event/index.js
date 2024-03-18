import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Event.css";
import CloaseNav from "./components/CloaseNav";
import Camera from "./components/Camera";
import AudioRecord from "./components/AudioRecord";
import ButtonComp from "../../Components/ButtonComp";
import { useFierbase } from "../../context/fierbasecontext";
import { v4 as uuidv4 } from 'uuid';

const Index = () => {
  const [description,setDescription] = useState("")
  const fierbase  = useFierbase()
  const currentDate = new Date();
  const date = `${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`
  const formattedTime = currentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  console.log(fierbase.userdata,"event data")

  const newArray = {
    id:uuidv4().slice(0,3),
    date:date,
    time:formattedTime,
    eventimg:fierbase.imageurl,
    audio:fierbase.mediaUrl,
    description:"description",
  }
  const handlesubmmit = ()=>{
    fierbase.Writedata("/users/"+ fierbase.userId +"/event/"+uuidv4().slice(0,3),newArray  )
  }

  return (
    <section className="EventPagemain">
      <section className="closenavmain">
        <CloaseNav />
      </section>
      <section className="Cameramain">
        <Camera />
      </section>
      <section className="Eventdescriptionmain">
        <Container className="EventDescription">
          <span>Please write a notes below</span>
          <textarea placeholder="Notes Hear..." onChange={(e)=>setDescription(e.target.value)}/>
          <p>Max 500</p>
        </Container>
      </section>
      <section className="Audiorecordmain">
        <span style={{margin:"0 0 0 3vw",fontSize:"5vw",color:"#585758"}}>Voice recording</span>
        <AudioRecord />
      </section>
      <section className="EventButtonmain">
        <ButtonComp valuebutton="SUBMIT" className="EventButton" handleClick={handlesubmmit}></ButtonComp>
      </section>
    </section>
  );
};

export default Index  ;
