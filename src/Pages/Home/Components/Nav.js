import React from "react";
import Heroicon from "../../../Assets/Headicon/HeroIcon.png";
import ProfileAvtar from "../../../Assets/Home/Avatar.png";
import { useNavigate } from "react-router";

const Nav = () => {
  const navigate = useNavigate()
  return (
    <div className=" container HomeNav">
      <img src={Heroicon} className="navimgmain" alt="HeroImage"/>
      <button onClick={()=> navigate("/profile")}>
        <img src={ProfileAvtar} className="navimgprofile" alt="Profile"/>
      </button>
    </div>
  );
};

export default Nav;
