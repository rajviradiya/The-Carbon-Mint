import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router";
import { useFierbase } from "../../../context/fierbasecontext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 3,
  width: "80vw",
  height: "30vh",
};

const OtpveryfyModal = ({ openM2, setOpenM2, handleClose, otp }) => {
  const navigate = useNavigate();
  const fierbase = useFierbase();

  const varifyOtp = () => {
    setOpenM2(false);
    fierbase.veryfyotp(otp);
    console.log("hello");
  };

  return (
    <Modal
      open={openM2}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} borderRadius={1}>
        <Typography
          id="modal-modal-title"
          sx={{ fontSize: "7vw", fontWeight: 600 }}
        >
          OTP
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 1 }}>
          We’ve resent a 6-digit confirmation OTP to your own mobile number.
        </Typography>
        <Button
          sx={{
            width: "15vw",
            height: "6vw",
            color: "#9A9A9B",
            backgroundColor: "transparent !important",
            mt: "2vw",
            ml: "50vw",
            p: 2,
          }}
          onClick={() => varifyOtp()}
        >
          Gotit
        </Button>
      </Box>
    </Modal>
  );
};

export default OtpveryfyModal;
