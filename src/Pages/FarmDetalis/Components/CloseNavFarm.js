import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const CloseNavFarm = () => {
  return (
    <div className="closenav">
      <div className="navicon">
        <Link to="/home">
          <IoIosArrowRoundBack />
        </Link>
      </div>
      <div className="navcont">
        <span>Chinnaiah Polam</span>
        <p>Kashimnagar, Telangana</p>
      </div>
    </div>
  );
};

export default CloseNavFarm;
