import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import "../Profile.css";
import { MdLogout } from "react-icons/md";
import LogoutModal from "./LogoutModal";

const BackNav = () => {
  return (
    <>
      <div className="BackNav">
        <div className="backicondiv">
          <IoIosArrowRoundBack className="Backicon" />
        </div>
        <div className="contant">
          <p>Farmer Profile</p>
        </div>
        <div class="dropdown">
          <button class="dropbtn">
            <BsThreeDotsVertical />
          </button>
          <div class="dropdown-content">
            <span>
              <LogoutModal />
              Logout
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default BackNav;
