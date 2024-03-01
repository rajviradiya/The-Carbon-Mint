import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Img from "../../../Assets/Login&Auth/GoogleIconLogin.png";

import { PhoneNumberUtil } from "google-libphonenumber";
import { useNavigate } from "react-router";

const Login = () => {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

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
  console.log(phone, "phone");

  return (
    <>
      <Container className="logincomp">
        <Col className=" ">
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
            <button
              type="button"
              disabled={!isValid}
              className="button1"
              onClick={() => {
                alert(`Submitted phone: ${phone}`);
                navigate("/auth");
              }}
            >
              Sign in
            </button>
            <button className="button2 button1">
              <img src={Img} alt="G"/>
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
