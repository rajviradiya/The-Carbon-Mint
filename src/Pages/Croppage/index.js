import React from "react";
import EventCard from "../Home/Components/EventCard";
import { useFierbase } from "../../context/fierbasecontext";
import { Link, useParams } from "react-router-dom";
import ClosenavCrop from "./Components/ClosenavCrop";
import "./Croppage.css"
import Cropmap from "./Components/Cropmap";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const Index = () => {
  let data = {}
  const firebase = useFierbase()
  const params = useParams()
  const ProcessArray = JSON.parse(localStorage.getItem("progress"))

  if (!firebase?.userdata?.event) {
    return (
      <Stack spacing={1}>
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />
      </Stack>
    )
  }

  //Filter Crops Id
  for (let i = 0; i < firebase?.userdata?.crops?.length; i++) {
    if (firebase?.userdata?.crops[i]?.id == params.id) {
      data = firebase?.userdata?.crops[i]
    }
  }

  return (
    <section className="cropmain">
      <section className="Closenavmain">
        <ClosenavCrop datamain={firebase?.userdata} data={data} />
      </section>
      <section className=" container    ">
        <img
          className="cropimage"
          src={`${data?.image}`}
          alt="FarmImage"
        />
      </section>
      <section className=" container cropdetails">
        <p className="detailscrop">Details</p>
        <ul className="list-group">
          <li className="list-group-item">
            <span>Acres</span>
            <p>{data?.Acres}</p>
          </li>
          <li className="list-group-item">
            <span>Cropping system type</span>
            <p>{data?.croppingsystemtype}</p>
          </li>
          <li className="list-group-item">
            <span>Seed variety</span>
            <p>{data?.seedvariety}</p>
          </li>
          <li className="list-group-item">
            <span>Seed type</span>
            <p>{data?.seedtype}</p>
          </li>
          <li className="list-group-item">
            <span>Seed source</span>
            <p>{data?.seedsource}</p>
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
          {firebase?.userdata?.event?.map((items, index) => (
            <>
              <Link key={index} to={`/eventdetails/${items.id}`} style={{ textDecoration: "none" }}>
                {
                  <EventCard eventdata={items} Localprocessdata={ProcessArray[items.id]} internet={firebase?.internet} />
                }
              </Link>
            </>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Index;
