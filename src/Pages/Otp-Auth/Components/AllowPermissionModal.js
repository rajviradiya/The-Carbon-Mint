import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useFierbase } from "../../../context/fierbasecontext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  padding:"5vw",
  width: "80vw",
};

const AllowPermissionModal = ({ openM1, setOpenM1, handleClose1, otp }) => {

  const fierbase = useFierbase();

  const Allowotp = ()=>{
    handleClose1()
  }

  return (
    <Modal
      open={openM1}
      onClose={handleClose1}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} borderRadius={1} style={{padding:"20px"}}>
        <Typography id="modal-modal-title" sx={{ fontSize: "5vw", fontWeight: 600 }}>
          Allow Carbon Mint to read SMS and automatically enter OTP
        </Typography>
        <Typography id="modal-modal-description" sx={{fontSize: "4vw", marginTop:"3vw"}}>
          Use this OTP to login to your Carbom Mint account.
        </Typography>
        <Button
          sx={{
            fontSize: "4vw",
            color: "#9A9A9B",
            backgroundColor: 'transparent !important',
            mt: "4vw",
            ml: "20vw",
            p:0
          }}
          onClick={() =>handleClose1()}
        >
          CANCEL
        </Button>
        <Button
          sx={{
            fontSize: "4vw",
            color: "#2B9348",
            backgroundColor: 'transparent !important',
            mt: "4vw",
            ml: "2vw",
            p: 0,
          }}
          onClick={() => Allowotp()}
        >
          ALLOW
        </Button>
      </Box>
    </Modal>
  );
};

export default AllowPermissionModal;
