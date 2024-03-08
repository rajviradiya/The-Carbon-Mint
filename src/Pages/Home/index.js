import React, { useEffect, useState } from "react";
import { useFierbase } from "../../context/fierbasecontext";
import { signOut } from "firebase/auth";
import { Outlet, useNavigate } from "react-router";
import { Col, Container, Row } from "react-bootstrap";
import FarmerDeailcard from "./Components/FarmerDeailcard";
import Nav from "./Components/Nav";

import "./Homepage.css";
import CropCard from "./Components/CropCard";
import EventCard from "./Components/EventCard";
const Index1 = ({ authuserrrr, setauthuserrrr }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    setauthuserrrr("");
  };

  return (
    <Container className="homepagemain">
      <Col className="homepagemaincol">
        <Row className="Navmain">
          <Nav />
        </Row>
        <Row className="farmerdetailmain">
          <FarmerDeailcard />
        </Row>
        <Row className="cropcardmain">
          <h5 className="fs-6">Crops</h5>
          <CropCard />
        </Row>

        <Row className="EventMain">
          <h5 className="fs-6">Events</h5>
          <EventCard />
        </Row>
      </Col>
      {/* <h1>{authuserrrr.email || "Loading....."}</h1>
      <h1>{authuserrrr.displayName}</h1>
      <button onClick={() => handleLogout()}>Logout</button> */}
    </Container>
  );
};

export default Index1;
