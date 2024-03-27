import React from "react";
import Login from "./Components/Login";
import { Col, Container, Row } from "react-bootstrap";
import "./Login.css";
import Heroicon from "../../Assets/Headicon/HeroIcon.png";
import { useFierbase } from "../../context/fierbasecontext";
import Alert from '@mui/material/Alert';

const Index = () => {
  const firebase = useFierbase()

  console.log(firebase?.errorMessageauth, "auth error in otp conformation")

  return (
    <>
      <section fluid className="Loginmaincont">
        <section className="homeicon">
          <img src={Heroicon} />
        </section>
        <section className="homelogincomp">
          <Login />
        </section>
        <section >
          {
              firebase?.errorMessageauth !== null  ?  (<Alert sx={{width:"80vw", position:"absolute",top:"85%", boxShadow: "0px 0px 6px gray"}} severity="error">{firebase?.errorMessageauth}</Alert>) : (<h1 style={{display:"none"}}></h1>)
          }
        </section>
      </section>
    </>
  );
};

export default Index;
