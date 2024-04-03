import React, { useEffect } from "react";
import EventCard from "../Home/Components/EventCard";
import { useFierbase } from "../../context/fierbasecontext";
import { Link, useParams } from "react-router-dom";
import ClosenavCrop from "./Components/ClosenavCrop";
import "./Croppage.css"
import Cropmap from "./Components/Cropmap";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const Index = () => {
  const firebase = useFierbase()
  const params = useParams()
  const ProcessArray = JSON.parse(localStorage.getItem("progress"))

  useEffect(()=>{
    firebase.setLandparcelSpeeddial(params.name)
  },[])

  const filterdataCrops = firebase?.userdata?.crops?.filter((item)=>{
    return item.name === params.name
  },[])

  const filterdata = firebase?.userdata?.event?.filter((item) => {
    return item.name === params.name
  }, [])

  console.log(filterdataCrops,params,"this is filter dta is this 222")
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

  return (
    <section className="cropmain">
      <section className="Closenavmain">
        <ClosenavCrop datamain={firebase?.userdata} data={filterdataCrops[0]} />
      </section>
      <section className=" container    ">
        <img
          className="cropimage"
          src={`${filterdataCrops[0]?.image}`}
          alt="FarmImage"
        />
      </section>
      <section className=" container cropdetails">
        <p className="detailscrop">Details</p>
        <ul className="list-group">
          <li className="list-group-item">
            <span>Acres</span>
            <p>{filterdataCrops[0]?.Acres}</p>
          </li>
          <li className="list-group-item">
            <span>Cropping system type</span>
            <p>{filterdataCrops[0]?.croppingsystemtype}</p>
          </li>
          <li className="list-group-item">
            <span>Seed variety</span>
            <p>{filterdataCrops[0]?.seedvariety}</p>
          </li>
          <li className="list-group-item">
            <span>Seed type</span>
            <p>{filterdataCrops[0]?.seedtype}</p>
          </li>
          <li className="list-group-item">
            <span>Seed source</span>
            <p>{filterdataCrops[0]?.seedsource}</p>
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
          {filterdata?.map((items, index) => (
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
