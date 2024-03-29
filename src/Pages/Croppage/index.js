import React from "react";
import EventCard from "../Home/Components/EventCard";
import { useFierbase } from "../../context/fierbasecontext";
import { Link, useParams } from "react-router-dom";
import ClosenavCrop from "./Components/ClosenavCrop";
import "./Croppage.css"
import Cropmap from "./Components/Cropmap";

const Index = () => {

  let data = {}
  const fierbase = useFierbase()
  const params = useParams()

  console.log(params.id, "params hook id ")

  //Filter Crops Id
  for (let i = 0; i < fierbase?.userdata?.crops?.length; i++) {
    if (fierbase?.userdata?.crops[i]?.id == params.id) {
      data = fierbase?.userdata?.crops[i]
    }
  }

  console.log(data, "data is this")

  return (
    <section className="cropmain">
      <section className="Closenavmain">
        <ClosenavCrop datamain={fierbase.userdata} data={data} />
      </section>
      <section className=" container    ">
        <img
          className="cropimage"
          src={`${data.image}`}
          alt="FarmImage"
        />
      </section>
      <section className=" container cropdetails">
        <p className="detailscrop">Details</p>
        <ul className="list-group">
          <li className="list-group-item">
            <span>Acres</span>
            <p>{data.Acres}</p>
          </li>
          <li className="list-group-item">
            <span>Cropping system type</span>
            <p>{data.croppingsystemtype}</p>
          </li>
          <li className="list-group-item">
            <span>Seed variety</span>
            <p>{data.seedvariety}</p>
          </li>
          <li className="list-group-item">
            <span>Seed type</span>
            <p>{data.seedtype}</p>
          </li>
          <li className="list-group-item">
            <span>Seed source</span>
            <p>{data.seedsource}</p>
          </li>
        </ul>
      </section>
      <section className="Farmemapmain">
        <p className="detailscrop detailscropmap ps-3">Field area map</p>
        <Cropmap />
      </section>
      <section className="Cropsevent">
        <p className="detailscrop ps-3">Events</p>
        <div className=" mb-5">
          {fierbase?.userdata?.event?.map((items) => (
            <>
              <Link to={`/eventdetails/${items.id}`} style={{ textDecoration: "none" }}>
                <EventCard items={items} />
              </Link>
            </>
          ))
          }
        </div>
      </section>
    </section>
  );
};

export default Index;
