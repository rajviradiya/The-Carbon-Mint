import React, { useState } from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { FiEdit } from "react-icons/fi";
import { TbZoomQuestion } from "react-icons/tb";
import { GiFarmer } from "react-icons/gi";
import { useNavigate } from "react-router";

const actions = [
  { icon: <FiEdit/>, name: "Input Log",path:"/event"},
  { icon: <GiFarmer />, name: "Intervention",path:"" },
  { icon: <TbZoomQuestion />, name: "Query",path:"" }

];
const SpeedDialNav = ({elementpass}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    const handleClosebutton = (path)=>{
        setOpen(false)
        navigate(path)
    }
  return (
    <Box sx={{ }}>
     {elementpass}
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: "fixed", bottom: 16, right: 16,}}
        icon={<SpeedDialIcon sx={{display:"flex", justifyContent:"center", alignItems:"center"}}/>}
        onClose={handleClose} 
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon }
            tooltipTitle={action.name}
            tooltipOpen
            onClick={()=>{handleClosebutton(action.path)}}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default SpeedDialNav;
