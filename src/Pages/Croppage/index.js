import React, { useEffect, useState } from "react";
import EventCard from "../MultipleLandParcel/Components/EventCard";
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
  const [crop, setCrop] = useState([]);
  const [landparcel, setLandParcel] = useState([])
  const [landparcel2, setLandParcel2] = useState([])
  const ProcessArray = JSON.parse(localStorage.getItem("progress"))

  useEffect(() => {
    firebase.setLandparcelSpeeddial(params.id)
  }, [])

  //Crop And Landparcel Data
  const getDatabase = () => {
    return new Promise(function (resolve, rejected) {
      if (firebase?.multipleLandParcel) {
        resolve()
      } else {
        rejected()
      }
    })
  }
  getDatabase()
    .then((res) => {
      //For Crop Details Page onlly
      for (let i = 0; i < firebase?.multipleLandParcel?.LandParcels?.length; i++) {
        for (let j = 0; j < firebase?.multipleLandParcel?.LandParcels[i].crops.length; j++) {
          if (firebase?.multipleLandParcel?.LandParcels[i].crops[j].id == params.id) {
            setLandParcel2(firebase?.multipleLandParcel?.LandParcels[i])
            setCrop(firebase?.multipleLandParcel?.LandParcels[i].crops[j])
          }
        }
      }
      //for LandParcel
      for (let i = 0; i < firebase?.multipleLandParcel?.LandParcels?.length; i++) {
        if (firebase?.multipleLandParcel?.LandParcels[i]?.id == params.id) {
          setLandParcel(firebase?.multipleLandParcel?.LandParcels[i])
        }
      }
    })
    .catch((err) => {
      console.log(err)
    })

  const eventforcrops = firebase?.multipleLandParcel?.event?.filter((item) => {
    return item.name === crop.name
  })

  if (!firebase?.multipleLandParcel?.LandParcels) {
    return (
      <Stack spacing={1} sx={{ "display": "flex", "flexDirection": "column", "justifyContent": "center", "alignItems": "center" }}>
        <Skeleton variant="text" width={"90vw"} sx={{ fontSize: '2rem' }} />
        <Skeleton variant="rectangular" width={"90vw"} height={"15vh"} />
        <Skeleton variant="rectangular" width={"90vw"} height={"15vh"} />
        <Skeleton variant="rectangular" width={"90vw"} height={"15vh"} />
        <Skeleton variant="rectangular" width={"90vw"} height={"40vh"} />
      </Stack>
    )
  }

  return (
    <section className="cropmain">
      <section className="Closenavmain">
        <ClosenavCrop landparcel2={landparcel2} landparcel={landparcel} crop={crop} />
      </section>
      <section className=" container    ">
        <img
          className="cropimage"
          src={`${crop?.image}`}
          alt="FarmImage"
        />
      </section>
      <section className=" container cropdetails">
        <p className="detailscrop">Details</p>
        <ul className="list-group">
          <li className="list-group-item">
            <span>Acres</span>
            <p>{crop?.Acres}</p>
          </li>
          <li className="list-group-item">
            <span>Cropping system type</span>
            <p>{crop?.croppingsystemtype}</p>
          </li>
          <li className="list-group-item">
            <span>Seed variety</span>
            <p>{crop?.seedvariety}</p>
          </li>
          <li className="list-group-item">
            <span>Seed type</span>
            <p>{crop?.seedtype}</p>
          </li>
          <li className="list-group-item">
            <span>Seed source</span>
            <p>{crop?.seedsource}</p>
          </li>
        </ul>
      </section>
      <section className="Farmemapmain">
        <p className="detailscrop detailscropmap ps-3">Field area map</p>
        <Cropmap paramname={params} />
      </section>
      <section className="Cropsevent">
        <p className="detailscrop ps-3">Events</p>
        <div className=" mb-5">
          {eventforcrops?.map((items, index) => (
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
  );
};

export default Index;
