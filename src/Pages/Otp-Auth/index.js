import React from "react";
import "./OtpAuth.css";
import OtpComp from "./Components/OtpComp";
import HeroImg from "../../Assets/Headicon/HeroIcon.png";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const index = () => {
  return (
      <section fluid className="otpmainindex">
        <section className="navicon">
          <Link to="/">
            <IoIosArrowRoundBack className="arrowicon" />
          </Link>
        </section>
        <section className="HeroIcon">
          <img src={HeroImg} alt="Hero Img" />
        </section>
        <section>
          <OtpComp />
        </section>
      </section>
  );
};

export default index;
