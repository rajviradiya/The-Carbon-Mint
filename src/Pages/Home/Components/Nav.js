import React from "react";
import Heroicon from "../../../Assets/Headicon/HeroIcon.png";
import ProfileAvtar from "../../../Assets/Home/Avatar.png";

const Nav = () => {
  return (
    <div className="HomeNav">
      <img src={Heroicon} />
      <div>
        <img src={ProfileAvtar} />
      </div>
    </div>
  );
};

export default Nav;
