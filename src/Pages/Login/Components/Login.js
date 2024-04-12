import React from "react";
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

const Login = () => {
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();
  const firebase = useFierbase();

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
  const isValid = isPhoneValid(firebase.ponewithdial);

  //phone handle
  const handlephone = (e) => {
    setPhone(e.target.value);
    firebase.setPhonewithdial(String(firebase.dialcode + e.target.value));
  };

  //Phone Login
  const handlesubmmitotp = () => {

    firebase.phonelogin(firebase.ponewithdial)
      .then((res) => {
        firebase.setPhoneLoginUser(res);
        navigate("/auth");
      })
      .catch((err) => {
        console.log(err, "otp error");
      });
  };

  //Google Login
  const handleGoogleLogin = () => {
    firebase
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
              <InputAdornment sx={{ color: "#363537" }} position="center">
                {firebase.dialcode}
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
          error={firebase.ponewithdial === "" ? (isValid) : (!isValid)}
          helperText={
            firebase.ponewithdial === "" ?
              (
                isValid && <div></div>
              ) :
              (
                !isValid && <div style={{ color: "red" }}>Phone is not valid</div>
              )
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
      <div id="sign-in-button" />
      <Row className="buttonslogin">
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
