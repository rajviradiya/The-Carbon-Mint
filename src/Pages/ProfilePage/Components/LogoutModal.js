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
  border: "0px",
  boxShadow: 24,
  p: 4,
  width: 300,
  height: 200,
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
      <Button onClick={handleOpen}>
        <LogoutIcon />
        <p>Logout</p>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} borderRadius={1}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Logout
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to logout from this device?{" "}
          </Typography>
          <Button
            sx={{
              width: 5,
              height: 20,
              backgroundColor: "#FFFFFF",
              color: "#9A9A9B",
              mt: 4,
              ml: 13,
              p: 0,
            }}
            onClick={() => handleLogout()}
          >
            Yes
          </Button>
          <Button
            href="#contained-buttons"
            sx={{
              width: 5,
              height: 20,
              color: "#2B9348",
              backgroundColor: "#FFFFFF",
              mt: 4,
              p: 0,
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
