import React, { useState } from "react";
import {  Col, Container, Row } from "react-bootstrap";
import OTPInput, { ResendOTP } from "otp-input-react";

const OtpComp = () => {
  const [OTP, setOTP] = useState("");

  return (
    <Container fluid className="otpcomp">
      <Col>
        <Row className="otpcomphead">
          <span>OTP</span>
          <p>We have sent an OTP over SMS. Please enter the OTP to proced</p>
        </Row>
        <Row className="optinput">
          <OTPInput
            value={OTP}
            onChange={setOTP}
            autoFocus
            OTPLength={6}
            otpType="number"
            disabled={false}
          />
        </Row>
        <Row className="otpcompbutton">
          <button>COUNTINEW</button>
        </Row>
        <Row>
          <ResendOTP onResendClick={() => console.log("Resend clicked")} />
          <span>
            Resend <span>OTP</span>
          </span>
        </Row>
      </Col>
    </Container>
  );
};

export default OtpComp;
