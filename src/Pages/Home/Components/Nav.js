import React from "react";
import Heroicon from "../../../Assets/Headicon/HeroIcon.png";
import ProfileAvtar from "../../../Assets/Home/Avatar.png";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router";

const Nav = () => {

  const navigate = useNavigate()
  
  return (
    <div className=" container HomeNav">
      <img src={Heroicon} className="navimgmain"/>
      <button onClick={()=> navigate("/profile")}>
        <img src={ProfileAvtar} className="navimgprofile" />
      </button>
    </div>
  );
};

export default Nav;
