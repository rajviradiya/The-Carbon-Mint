import React from "react";
import Login from "./Components/Login";
import "./Login.css";
import Heroicon from "../../Assets/Headicon/HeroIcon.png";
import { useFierbase } from "../../context/fierbasecontext";
import Alert from '@mui/material/Alert';

const Index = () => {
  const firebase = useFierbase()
  return (
    <section fluid className="Loginmaincont">
      <section className="homeicon">
        <img src={Heroicon} alt="HeroImg" />
      </section>
      <section className="homelogincomp">
        <Login />
      </section>
      <section className="otpAlert">
        {
          firebase?.errorMessageauth !== null ?
            (<Alert
              sx={{
                width: "80vw",
                position: "absolute",
                top: "85%",
                boxShadow: "0px 0px 6px gray"
              }}
              severity="error">
              {firebase?.errorMessageauth}
            </Alert>)
            : (<div style={{ display: "none" }}></div>)
        }
      </section>
    </section>
  );
};

export default Index;
