import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const CloseNavFarm = ({ data }) => {
  return (
    <div className="closenav">
      <div className="navicon">
        <Link to="/home">
          <IoIosArrowRoundBack />
        </Link>
      </div>
      <div className="navcont">
        <span>{data?.city}</span>
        <p>{data?.district},{data?.state}</p>
      </div>
    </div>
  );
};

export default CloseNavFarm;
