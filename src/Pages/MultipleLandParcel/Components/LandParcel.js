import React, { useEffect, useState } from "react";
import FarmerDeailcard from "./FarmerDeailcard";
import CropCard from "./CropCard";
import EventCard from "./EventCard";
import { useFierbase } from "../../../context/fierbasecontext";
import { Link } from "react-router-dom";

const LandParcel = ({ landparceldata, event,setCurrentSlide }) => {
  const firebase = useFierbase();
  const ProcessArray = JSON.parse(localStorage.getItem("progress"))

  const allevent = event?.event?.filter((item) => {
    return item.type == landparceldata.Landparcel
  }).reverse()

  return (
    <section className="homepagemain ">
      <section className="farmerdetailmain">
        <FarmerDeailcard landparceldata={landparceldata} />
      </section>
      <section className="cropcardmain">
        <span className="croptitle">Crops</span>
        <>
          {landparceldata?.crops?.map((items) => (
            <>
              <CropCard items={items} />
            </>
          ))}
        </>
      </section>
      <section className="EventMain">
        <span className="croptitle">Events</span>
        {allevent?.map((items, index) => (
          <>
            <Link key={index} to={`/eventdetails/${items.id}`} style={{ textDecoration: "none" }}>
              {
                <EventCard eventdata={items} Localprocessdata={ProcessArray[items.id]} internet={firebase?.internet} />
              }
            </Link>
          </>
        ))}
      </section>
    </section>
  );
};

export default LandParcel;
