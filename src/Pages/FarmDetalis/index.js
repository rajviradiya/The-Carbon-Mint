import React, { useEffect } from "react";
import CloseNavFarm from "./Components/CloseNavFarm";
import "./FarmPage.css";
import Farmmap from "./Components/Farmmap";
import CropCard from "../Home/Components/CropCard";
import { useFierbase } from "../../context/fierbasecontext";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Link, useParams } from "react-router-dom";
import EventCard from "../Home/Components/EventCard";

const Index = () => {
  const firebase = useFierbase()
  const params = useParams()
  const ProcessArray = JSON.parse(localStorage.getItem("progress"))
  
  useEffect(()=>{
    firebase.setLandparcelSpeeddial(params.name)
  },[])

  const filterdata = firebase?.userdata?.event?.filter((item)=>{
    return item.name === "Landparcel1"
  },[])

  console.log(filterdata,params.name,"filter data")
  if (!firebase?.userdata?.farmdetail) {
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
          <CloseNavFarm data={firebase?.userdata} />
        </section>
        <section className=" container">
          <img
            className="Frampageimage"
            src={`${firebase?.userdata?.ProfilePic}`}
            alt="FarmImage"
          />
        </section>
        <section className=" container farmdeatails">
          <p className="details">Details</p>
          <ul className="list-group">
            <li className="list-group-item">
              <span>Survey number(s)</span>
              <p>{firebase?.userdata?.farmdetail?.surveynumber}</p>
            </li>
            <li className="list-group-item">
              <span>Acres</span>
              <p>{firebase?.userdata?.farmdetail?.Acres}</p>
            </li>
            <li className="list-group-item">
              <span>Land ownership</span>
              <p>{firebase?.userdata?.farmdetail?.landownership}</p>
            </li>
            <li className="list-group-item">
              <span>Land owner</span>
              <p>{firebase?.userdata?.farmdetail?.landowner}</p>
            </li>
            <li className="list-group-item">
              <span>Water resources</span>
              <p>{firebase?.userdata?.farmdetail?.waterresources}</p>
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
          <p className="details ps-3">Crops</p>
          <div className=" mb-5">
            {filterdata.map((items, index) => (
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
    </>
  );
};

export default Index;
