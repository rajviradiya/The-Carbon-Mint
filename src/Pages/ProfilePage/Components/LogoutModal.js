import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LogoutIcon from "@mui/icons-material/Logout";
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
  padding:"5vw",
  width: "80vw",
};

const LogoutModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const fierbase = useFierbase();

  console.log(open, "fierbase");

  const handleLogout = () => {
    handleClose();
    fierbase.logoutuser().then((res) => {
      navigate("/");
    });
  };

  return (
    <div>
      <Button onClick={handleOpen} sx={{ backgroundColor: "transparent !important" }}>
        <LogoutIcon />
        <p >Logout</p>
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} borderRadius={1} >
          <Typography id="modal-modal-title" sx={{fontSize:"5vw",fontWeight:"600"}}>
            Logout
          </Typography>
          <Typography id="modal-modal-description" sx={{fontSize:"4vw", marginTop:"3vw",color:"#585758"}}>
            Are you sure you want to logout from this device?{" "}
          </Typography>
          <Button
            sx={{
              fontSize:"4vw",
              color: "#9A9A9B",
              backgroundColor: 'transparent !important',
              mt: "4vw",
              ml: "30vw",
              p:0
            }}
            onClick={() => handleLogout()}
          >
            Yes
          </Button>
          <Button
            href="#contained-buttons"
            sx={{
              fontSize:"4vw",
              color: "#2B9348",
              backgroundColor: 'transparent !important',
              mt: "4vw",
              p:0
            }}
            onClick={() => handleClose()}
          >
            No
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default LogoutModal;
