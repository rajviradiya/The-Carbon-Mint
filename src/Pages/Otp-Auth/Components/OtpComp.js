import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useNavigate } from "react-router";
import { FierbaseContext, useFierbase } from "../../../context/fierbasecontext";

const OtpComp = () => {
  const [otp, setOtp] = React.useState("");

  const fierbase = useFierbase();
  console.log(fierbase, "fierbase");

  const phoneloginotp = useContext(FierbaseContext);
  console.log("phoneloginotp", phoneloginotp.phoneloginuser);

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const varifyOtp = () => {
    fierbase.veryfyotp(phoneloginotp, otp);

    // try {
    //   const conform = phoneloginotp.confirm(otp);XF
    //   console.log(conform, "error");
    //   if (conform) {
    //     navigate("/home");
    //   } else {
    //     navigate("/");
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  };
  return (
    <Container fluid className="otpcomp">
      <Col>
        <Row className="otpcomphead">
          <span>OTP</span>
          <p>We have sent an OTP over SMS. Please enter the OTP to proced</p>
        </Row>
        <Row className="optinput">
          <MuiOtpInput
            autoFocus
            length={6}
            TextFieldsProps={{ placeholder: "-" }}
            value={otp}
            onChange={handleChange}
          />
        </Row>
        <Row className="otpcompbutton">
          <button onClick={() => varifyOtp()}>CONTINUE</button>
        </Row>
        <Row>
          <span>
            Resend <span>OTP</span>
          </span>
        </Row>
      </Col>
    </Container>
  );
};

export default OtpComp;
