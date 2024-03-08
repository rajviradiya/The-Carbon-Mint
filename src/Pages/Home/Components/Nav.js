import React from "react";
import Heroicon from "../../../Assets/Headicon/HeroIcon.png";
import ProfileAvtar from "../../../Assets/Home/Avatar.png";
import { Container } from "react-bootstrap";

const Nav = () => {
  return (
    <Container fluid className="HomeNav">
      <img src={Heroicon} />
      <div>
        <img src={ProfileAvtar} />
      </div>
    </Container>
  );
};

export default Nav;
