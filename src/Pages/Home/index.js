import React, { useEffect, useState } from "react";
import FarmerDeailcard from "./Components/FarmerDeailcard";
import Nav from "./Components/Nav";

import "./Homepage.css";
import CropCard from "./Components/CropCard";
import EventCard from "./Components/EventCard";
import { useFierbase } from "../../context/fierbasecontext";

const Index1 = () => {

  const fierbase = useFierbase();

  
  console.log(fierbase?.userdata?.crops,"----->data");

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
          {fierbase?.userdata?.crops?.map((items)=>(
            <>
           <CropCard items={items}/>
            </>
          ))}
        </>
      </section>
      <section className="EventMain">
        <span className="croptitle">Events</span>
        <EventCard />
      </section>
      {/* <h1>{authuserrrr.email || "Loading....."}</h1>
      <h1>{authuserrrr.displayName}</h1>
      <button onClick={() => handleLogout()}>Logout</button> */}
    </section>
  );
};

export default Index1;
