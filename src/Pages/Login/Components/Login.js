import React, { useEffect } from "react";
import {
  InputAdornment,
  TextField,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

import "react-international-phone/style.css";

import { Container, Row } from "react-bootstrap";
import { useState } from "react";
import Img from "../../../Assets/Login&Auth/GoogleIconLogin.png";
import { PhoneNumberUtil } from "google-libphonenumber";
import { useNavigate } from "react-router";
import { useFierbase } from "../../../context/fierbasecontext";
import ButtonComp from "../../../Components/ButtonComp";
import Box from '@mui/material/Box';

const Login = () => {
  const [phone, setPhone] = useState("");
  const [ponewithdial, setPhonewithdial] = useState("");

  const navigate = useNavigate();
  const fierbase = useFierbase();

  console.log(ponewithdial, "Phone number is this");

  //Phone Validation Api
  const phoneUtil = PhoneNumberUtil.getInstance();
  const isPhoneValid = (ponewithdial) => {
    try {
      return phoneUtil.isValidNumber(
        phoneUtil.parseAndKeepRawInput(ponewithdial)
      );
    } catch (error) {
      return false;
    }
  };
  const isValid = isPhoneValid(ponewithdial);

  console.log(isValid, "validation");
  //phone handle

  const handlephone = (e) => {
    setPhone(e.target.value);
    const stringphone = e.target.value;
    setPhonewithdial(String(fierbase.dialcode + e.target.value));
  };
  //Phone Login
  const handlesubmmitotp = () => {
    fierbase.phonelogin(ponewithdial);
  };

  //Google Login
  const handleGoogleLogin = () => {
    fierbase
      .signupwithgoogle()
      .then(() => {
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Row className="HomeLogin">
        <span>Login</span>
        <p>Enter your mobile number to login</p>
      </Row>
      <Row className="mobileinput">
        <TextField
          id="outlined-basic"
          sx={{
            width: "26%",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment sx={{color:"#363537"}} position="center">
                {fierbase.dialcode}
                <KeyboardArrowDownIcon />
              </InputAdornment>
            ),
          }}
          onClick={() => {
            navigate("/countrys");
          }}
        />
        <TextField
          sx={{
            width: "70%",
          }}
          id="outlined-basic"
          label="Mobile number"
          error={!isValid}
          helperText={
            !isValid && <div style={{ color: "red" }}>Phone is not valid</div>
          }
          color="success"
          value={phone}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CancelPresentationIcon
                  sx={{ width: "5vw" }}
                  onClick={() => {
                    setPhone("");
                  }}
                />
              </InputAdornment>
            ),
          }}
          onChange={(e) => handlephone(e)}
        />
      </Row>
      <Row className="buttonslogin">
        <div id="sign-in-button" />
        <ButtonComp
          className="button1"
          valuebutton={"SIGN IN"}
          handleClick={handlesubmmitotp}
          disabled={!isValid}
          onClick={() => {
            alert("sdfeewwqe");
          }}
        />
        <button
          className="button2"
          onClick={() => {
            handleGoogleLogin();
          }}
        >
          <img src={Img} alt="G" />
          <span className="ms-3">Sign in with Google</span>
        </button>
      </Row>
      <Row className="term">
        <span className="span1">
          By tapping on login, I agree to Carbon Mint's
        </span>
        <span className="span2">terms of services & privacy policy.</span>
      </Row>
    </Container>
  );
};

export default Login;
