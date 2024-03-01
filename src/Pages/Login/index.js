import React from "react";
import Login from "./Components/Login";
import { Col, Container, Row } from "react-bootstrap";
import "./Login.css"
import Heroicon from "../../Assets/Headicon/HeroIcon.png"

const index = () => {
  return (
    <>
      <Container >
        <Col className="">
          <Row className="homeicon" >
            <img src={Heroicon}/>
          </Row>
          <Row>
            <Login/>
          </Row>
        </Col>
      </Container>
    </>
  );
};

export default index;
