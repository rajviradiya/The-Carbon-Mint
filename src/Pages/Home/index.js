import React, { useEffect, useState } from "react";
import FarmerDeailcard from "./Components/FarmerDeailcard";
import Nav from "./Components/Nav";

import "./Homepage.css";
import CropCard from "./Components/CropCard";
import EventCard from "./Components/EventCard";
import { useFierbase } from "../../context/fierbasecontext";
import { Link } from "react-router-dom";

const Index1 = () => {

  const fierbase = useFierbase();
  console.log(fierbase?.userdata?.event, "---------->data");

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
        <>
          {fierbase?.userdata?.crops?.map((items) => (
            <>
              <CropCard items={items} />
            </>
          ))}
        </>
      </section>
      <section className="EventMain">
        <span className="croptitle">Events</span>
        {fierbase?.userdata?.event?.map((items) => (
          <>
            <Link to={`/eventdetails/${items.id}`} style={{ textDecoration: "none" }}>
              <EventCard items={items}/>
            </Link>
          </>
        ))}
      </section>
    </section>
  );
};

export default Index1;
