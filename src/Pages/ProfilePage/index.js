import React from "react";
import BackNav from "./Components/BackNav";
import { GiSmartphone } from "react-icons/gi";
import { MdAlternateEmail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { useFierbase } from "../../context/fierbasecontext";

const Index = () => {
  const fierbase = useFierbase();
  return (
    <section fluid className="Profilecont">
      <section className="BackNavRow">
        <BackNav />
      </section>
      <section className="Profilerow1">
        <div className="profileimage">
          <img src={fierbase?.userdata?.farmerProfilepic} alt="Profile" />
        </div>
        <div className="profilecont">
          <span>{fierbase?.userdata?.displayName}</span>
          <p>ID: {fierbase?.userId}</p>
        </div>
      </section>
      <section className="profilecontaintrow container">
        <div className="diviconcont">
          <div className="divicon">
            <GiSmartphone />
          </div>
          <div className="divicontaint">
            <span>Phone number</span>
            <p>{fierbase?.userdata?.phone}</p>
          </div>
        </div>
        <div className="diviconcont">
          <div className="divicon">
            <MdAlternateEmail />
          </div>
          <div className="divicontaint">
            <span>Email ID</span>
            <p>{fierbase?.userdata?.email}</p>
          </div>
        </div>
        <div className="diviconcont">
          <div className="divicon">
            <IoLocationOutline />
          </div>
          <div className="divicontaint">
            <span>Address</span>
            <p>{fierbase?.userdata?.address}</p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Index;
