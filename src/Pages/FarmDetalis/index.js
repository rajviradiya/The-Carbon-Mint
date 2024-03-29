import React from "react";
import CloseNavFarm from "./Components/CloseNavFarm";
import "./FarmPage.css";
import Farmmap from "./Components/Farmmap";
import CropCard from "../Home/Components/CropCard";
import { useFierbase } from "../../context/fierbasecontext";

const Index = () => {

  const fierbase = useFierbase()

  console.log(fierbase.userdata, "data is this detail page ")
  return (
    <>
      <section className="FarmpageMain">
        <section className="Closenavmain">
          <CloseNavFarm data={fierbase.userdata} />
        </section>
        <section className=" container">
          <img
            className="Frampageimage"
            src={`${fierbase?.userdata?.ProfilePic}`}
            alt="FarmImage"
          />
        </section>
        <section className=" container farmdeatails">
          <p className="details">Details</p>
          <ul className="list-group">
            <li className="list-group-item">
              <span>Survey number(s)</span>
              <p>{fierbase?.userdata?.farmdetail?.surveynumber}</p>
            </li>
            <li className="list-group-item">
              <span>Acres</span>
              <p>{fierbase?.userdata?.farmdetail?.Acres}</p>
            </li>
            <li className="list-group-item">
              <span>Land ownership</span>
              <p>{fierbase?.userdata?.farmdetail?.landownership}</p>
            </li>
            <li className="list-group-item">
              <span>Land owner</span>
              <p>{fierbase?.userdata?.farmdetail?.landowner}</p>
            </li>
            <li className="list-group-item">
              <span>Water resources</span>
              <p>{fierbase?.userdata?.farmdetail?.waterresources}</p>
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
          {fierbase?.userdata?.crops?.map((items)=>(
            <>
           <CropCard items={items}/>
            </>
          ))}
        </div>
        </section>
      </section>
    </>
  );
};

export default Index;
