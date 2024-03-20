import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useNavigate } from "react-router";
import { FierbaseContext, useFierbase } from "../../../context/fierbasecontext";
import Buttoncomp from "../../../Components/ButtonComp";
import AllowPermissionModal from "./AllowPermissionModal";
import { useState } from "react";
import OtpveryfyModal from "./OtpveryfyModal";

const OtpComp = () => {
  const [otp, setOtp] = useState("");

  const [openM2, setOpenM2] = useState(false);  
  const [openM1, setOpenM1] = useState(false);  

  useEffect(()=>{
    handleOpen1()
  },[])

  const fierbase = useFierbase();
  console.log(fierbase.phoneloginuser,"fierbase phoneloginuser")

  const handleOpen = () => setOpenM2(true);
  const handleClose = () => setOpenM2(false);

  
  const handleOpen1 = () => setOpenM1(true);
  const handleClose1 = () => setOpenM1(false);

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  return (
    <div className=" container otpcomp">
      <div className="otpcomphead">
        <span>OTP</span>
        <p>We have sent an OTP over SMS. Please enter the OTP to proced</p>
      </div>
      <div className="otpinput">
        <MuiOtpInput
          autoFocus
          length={6}
          TextFieldsProps={{ placeholder: "-" }}
          value={otp}
          onChange={handleChange}
        />
      </div>
      <div className="otpcompbutton">
        <Buttoncomp valuebutton={"CONTINUE"} handleClick={handleOpen} />
      </div>
      <div className="resendopt">
        <span>
          Resend <span>OTP</span>
        </span>
      </div>
      <OtpveryfyModal openM2={openM2} setOpenM2={setOpenM2} handleClose={handleClose} otp={otp}/>
      <AllowPermissionModal  openM1={openM1} setOpenM1={setOpenM1} handleClose1={handleClose1} otp={otp}/>
    </div>
  );
};

export default OtpComp;
