import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Img from "../../../Assets/Login&Auth/GoogleIconLogin.png";

import { PhoneNumberUtil } from "google-libphonenumber";
import { useNavigate } from "react-router";

import { database } from "../../../Config/fierbase";
import { useFierbase } from "../../../context/fierbasecontext";
import { v4 as uuid } from "uuid";

import ButtonComp from "../../../Components/ButtonComp";

const Login = () => {
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();
  const fierbase = useFierbase();

  // const handleuser = () => {
  //   //create user
  //   let sigininuser = fierbase.signInWithEmailAndPassword(
  //     "raj112@gmial.com",
  //     "123456"
  //   );
  //   //set That data in realtime database
  //   fierbase.putdat("/users/" + uuid().slice(0, 8), {
  //     email: "raj112@gmial.com",
  //     password: "123456",
  //   });
  // };

  //Phone Validation Api
  const phoneUtil = PhoneNumberUtil.getInstance();
  const isPhoneValid = (phone) => {
    try {
      return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch (error) {
      return false;
    }
  };
  const isValid = isPhoneValid(phone);

  //on Signin click
  const handlesubmmitotp = () => {
    fierbase.phonelogin(phone);
    console.log("found error");
  };

  //Google Login
  const handleGoogleLogin = () => {
    fierbase.signupwithgoogle();
    navigate(`/home`);
  };

  return (
    <>
      <Container fluid>
        <Col className="logincompcol ">
          <Row className="HomeLogin">
            <span>Login</span>
            <p>Enter your mobile number to login</p>
          </Row>
          <Row className="mobileinput">
            <PhoneInput
              defaultCountry="in"
              value={phone}
              onChange={(phone) => setPhone(phone)}
            />
            <span className="validation">
              {!isValid && (
                <div style={{ color: "red" }}>Phone is not valid</div>
              )}
            </span>
          </Row>
          <Row className="buttonslogin">
            <div className="mt-3" id="recaptcha" />
            <ButtonComp
              className="button1"
              valuebutton={"SIGN IN"}
              disabled={!isValid}
              onClick={() => {
                handlesubmmitotp();
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
        </Col>
      </Container>
    </>
  );
};

export default Login;
