import React from "react";
import "./OtpAuth.css";
import OtpComp from "./Components/OtpComp";
import HeroImg from "../../Assets/Headicon/HeroIcon.png";
import { Col, Container, Row } from "react-bootstrap";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const index = () => {
  return (
    <>
      <Container fluid>
        <Col className="">
          <Row>
            <ArrowBackIcon fontSize="large" className="arrowicon" />
          </Row>
          <Row className="HeroIcon">
            <img src={HeroImg} alt="Hero Img" />
          </Row>
          <Row>
            <OtpComp />
          </Row>
        </Col>
      </Container>
    </>
  );
};

export default index;
