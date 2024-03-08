import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LogoutIcon from "@mui/icons-material/Logout";
import { Bolt } from "@mui/icons-material";

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
  height: 300,
};

const LogoutModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>
        <LogoutIcon />
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
          <Typography id="modal-modal-description" >
            Are you sure you want to logout from this device?{" "}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default LogoutModal;
