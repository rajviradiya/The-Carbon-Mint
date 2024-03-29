import React, { useEffect } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useNavigate } from "react-router";
import { useFierbase } from "../../../context/fierbasecontext";
import Buttoncomp from "../../../Components/ButtonComp";
import AllowPermissionModal from "./AllowPermissionModal";
import { useState } from "react";
import OtpveryfyModal from "./OtpveryfyModal";

const OtpComp = () => {
  const [otp, setOtp] = useState("");

  const [openM2, setOpenM2] = useState(false);
  const [openM1, setOpenM1] = useState(false);
  const fierbase = useFierbase();
  const navigate = useNavigate();

  //Allow Permission Modal
  const handleOpen1 = () => setOpenM1(true);
  const handleClose1 = () => setOpenM1(false);
  //Otp Verify Modal
  const handleOpen = () => setOpenM2(true);
  const handleClose = () => setOpenM2(false);

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  useEffect(()=>{
    handleOpen1()
  },[])

  //verify otp
  const varifyOtp = () => {
    if (fierbase?.phoneloginuser) {
      fierbase.veryfyotp(otp).then((result) => {
        navigate("/home");
      })
        .catch((error) => {
          fierbase.setErrorMessageauth("Wrong OTP.");
          navigate("/");
        })
    } else {
      fierbase.setErrorMessageauth("Unregistered mobile number . Please enter registed mobile number and try again.");
      navigate("/");
    }
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
        <Buttoncomp valuebutton={"CONTINUE"} handleClick={varifyOtp} />
      </div>
      <div className="resendopt">
        <span>
          Resend <button onClick={() => handleOpen()} >OTP</button>
        </span>
      </div>
      <OtpveryfyModal openM2={openM2} setOpenM2={setOpenM2} handleClose={handleClose} otp={otp} />
      <AllowPermissionModal openM1={openM1} handleClose1={handleClose1}  />
    </div>
  );
};

export default OtpComp;
