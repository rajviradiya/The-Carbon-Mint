import React from "react";
import "./OtpAuth.css";
import OtpComp from "./Components/OtpComp";
import HeroImg from "../../Assets/Headicon/HeroIcon.png";
import { Col, Container, Row } from "react-bootstrap";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const index = () => {
  return (
    <>
      <Container fluid className="otpmainindex">
        <Col className="otpmainindexcol">
          <Row className="otpmainindexcolbackrow">
            <Link className="otpmainindexRowLink" to="/">
              <IoIosArrowRoundBack  className="arrowicon" />
            </Link>
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
