import React, { useEffect } from "react";
import CloseNavFarm from "./Components/CloseNavFarm";
import "./FarmPage.css";
import Farmmap from "./Components/Farmmap";
import { useFierbase } from "../../context/fierbasecontext";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Link, useParams } from "react-router-dom";
import EventCard from "../MultipleLandParcel/Components/EventCard";

const Index = () => {
  const firebase = useFierbase()
  const params = useParams()
  const ProcessArray = JSON.parse(localStorage.getItem("progress"))
  
  useEffect(()=>{
    firebase.setLandparcelSpeeddial(params.id)
  },[])

  const multilandparcel = firebase?.multipleLandParcel?.LandParcels?.filter((items)=>{
    return items.id == params.id
  })

  const landparcelevent = firebase?.multipleLandParcel?.event?.filter((item)=>{
    return item.name === multilandparcel[0].Landparcel
  })

  if (!firebase?.multipleLandParcel?.LandParcels) {
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
    <>
      <section className="FarmpageMain">
        <section className="Closenavmain">
          <CloseNavFarm data={multilandparcel[0]} />
        </section>
        <section className=" container">
          <img
            className="Frampageimage"
            src={`${multilandparcel[0].ProfilePic}`}
            alt="FarmImage"
          />
        </section>
        <section className=" container farmdeatails">
          <p className="details">Details</p>
          <ul className="list-group">
            <li className="list-group-item">
              <span>Survey number(s)</span>
              <p>{multilandparcel[0]?.farmdetail?.surveynumber}</p>
            </li>
            <li className="list-group-item">
              <span>Acres</span>
              <p>{multilandparcel[0]?.farmdetail?.Acres}</p>
            </li>
            <li className="list-group-item">
              <span>Land ownership</span>
              <p>{multilandparcel[0]?.farmdetail?.landownership}</p>
            </li>
            <li className="list-group-item">
              <span>Land owner</span>
              <p>{multilandparcel[0]?.farmdetail?.landowner}</p>
            </li>
            <li className="list-group-item">
              <span>Water resources</span>
              <p>{multilandparcel[0]?.farmdetail?.waterresources}</p>
            </li>
          </ul>
        </section>
        <section className="Farmemapmain">
          <p className="details ps-3">Land parcel area map</p>
          <Farmmap />
          <span className="farmermapdetail ps-3">
            Plot no: 91p, 92p, Sai Nagar, Kolluru, Telangana 500042.
          </span>
        </section>
        <section className="Crops">
          <p className="details ps-3">Events</p>
          <div className=" mb-5">
            {landparcelevent?.map((items, index) => (
              <>
                <Link key={index} to={`/eventdetails/${items.id}`} style={{ textDecoration: "none" }}>
                  {
                    <EventCard eventdata={items} Localprocessdata={ProcessArray && ProcessArray[items.id]} internet={firebase?.internet} />
                  }
                </Link>
              </>
            ))}
          </div>
        </section>
      </section>
    </>
  );
};

export default Index;
