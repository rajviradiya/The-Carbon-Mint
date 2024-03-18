import React from "react";
import Login from "./Components/Login";
import { Col, Container, Row } from "react-bootstrap";
import "./Login.css";
import Heroicon from "../../Assets/Headicon/HeroIcon.png";

const index = () => {
  return (
    <>
      <section fluid className="Loginmaincont">
        <section className="homeicon">
          <img src={Heroicon} />
        </section>
        <section className="homelogincomp">
          <Login />
        </section>
      </section>
    </>
  );
};

export default index;
