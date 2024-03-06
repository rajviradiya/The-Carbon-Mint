import React, { useEffect, useState } from "react";
import { useFierbase } from "../../context/fierbasecontext";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { Container, Row } from "react-bootstrap";
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
    <Container fluid className="homepagemain p-0">
      <Row className=" justify-content-center">
        <Nav />
      </Row>
      <Row className=" justify-content-center farmerdetail">
        <FarmerDeailcard />
      </Row>
      <Row className=" justify-content-center cropcardmain">
        <h5 className=" ms-5">Crops</h5>
        <CropCard/>
      </Row>
      <Row className=" justify-content-center EventMain">
      <h5 className=" ms-5">Events</h5>
        <EventCard/>
      </Row>

      <h1>{authuserrrr.email || "Loading....."}</h1>
      <h1>{authuserrrr.displayName}</h1>
      <button onClick={() => handleLogout()}>Logout</button>
    </Container>
  );
};

export default Index1;
