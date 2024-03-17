import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Event.css";
import CloaseNav from "./components/CloaseNav";
import Camera from "./components/Camera";
import AudioRecord from "./components/AudioRecord";
import ButtonComp from "../../Components/ButtonComp";

const index = () => {
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
          <textarea placeholder="Notes Hear..." />
          <p>Max 500</p>
        </Container>
      </section>
      <section className="Audiorecordmain">
        <AudioRecord />
      </section>
      <section className="EventButtonmain">
        <ButtonComp valuebutton="SUBMIT" className="EventButton"></ButtonComp>
      </section>
    </section>
  );
};

export default index;
