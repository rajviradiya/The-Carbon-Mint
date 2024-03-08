import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Event.css";
import CloaseNav from "./components/CloaseNav";
import Camera from "./components/Camera";
import Description from "./components/Description";
import AudioRecord from "./components/AudioRecord";
import ButtonComp from "../../Components/ButtonComp";

const index = () => {
  return (
    <Container className="EventPagemain">
      <Col className="">
        <Row className="closenavmain">
          <CloaseNav />
        </Row>
        <Row className="Cameramain">
          <Camera />
        </Row>
        <Row className="Eventdescriptionmain">
          <Description />
        </Row>
        <Row className="Audiorecordmain">
          <AudioRecord />
        </Row>
        <Row className="EventButtonmain">
            <ButtonComp valuebutton="SUBMIT" className="EventButton"></ButtonComp>
        </Row>
      </Col>
    </Container>
  );
};

export default index;
