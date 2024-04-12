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
  const navigate = useNavigate();
  const firebase = useFierbase();

  //Allow Permission Modal
  const handleOpen1 = () => setOpenM1(true);
  const handleClose1 = () => setOpenM1(false);
  //Otp Verify Modal
  const handleOpen = () => setOpenM2(true);
  const handleClose = () => setOpenM2(false);

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  // useEffect(()=>{
  //   handleOpen1()
  // },[])

  //verify otp
  const varifyOtpfunc = () => {
    if (firebase?.phoneloginuser) {
      firebase.veryfyotp(otp).then((result) => {
        navigate("/home");
      })
        .catch((error) => {
          console.log(error,"is wrrorrrrrrrr")
          if (error.code === 'auth/timeout') {
            console.error('Timeout error: OTP verification took too long.');
          } else {
            console.error('Error occurred during OTP verification:', error.message);
          }
          firebase.setErrorMessageauth("Wrong OTP.");
          navigate("/");
        })
    } else {
      firebase.setErrorMessageauth("Unregistered mobile number . Please enter registed mobile number and try again.");
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
        <Buttoncomp valuebutton={"CONTINUE"} handleClick={varifyOtpfunc} />
      </div>
      <div className="resendopt">
        <span>
          Resend <button onClick={() => handleOpen()} >OTP</button>
        </span>
      </div>
      <OtpveryfyModal openM2={openM2} setOpenM2={setOpenM2} handleClose={handleClose} otp={otp} />
      <AllowPermissionModal openM1={openM1} handleClose1={handleClose1} />
    </div>
  );
};

export default OtpComp;
