import React from "react";
import { useFierbase } from "../../context/fierbasecontext";
import { useNavigate } from "react-router";
import { Col, Container, Row } from "react-bootstrap";
import FarmerDeailcard from "./Components/FarmerDeailcard";
import Nav from "./Components/Nav";

import "./Homepage.css";
import CropCard from "./Components/CropCard";
import EventCard from "./Components/EventCard";
import { Link } from "react-router-dom";

const Index1 = () => {
  const fierbase = useFierbase();
  const navigate = useNavigate();

  console.log(fierbase.authuserrrr, "user is this");

  return (
    <section className="homepagemain">
        <section className="Navmain">
          <Nav />
        </section>
        <section className="farmerdetailmain">
            <FarmerDeailcard />
        </section>
        <section className="cropcardmain">
          <span className="croptitle">Crops</span>
            <CropCard />
        </section>
        <section className="EventMain">
          <h5 className="fs-6">Events</h5>
          <EventCard />
        </section>
      {/* <h1>{authuserrrr.email || "Loading....."}</h1>
      <h1>{authuserrrr.displayName}</h1>
      <button onClick={() => handleLogout()}>Logout</button> */}
    </section>
  );
};

export default Index1;
