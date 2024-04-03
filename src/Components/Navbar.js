import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { IoMdHome } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { TbZoomQuestion } from "react-icons/tb";
import { MdOutlineNotificationsNone } from "react-icons/md";

import "./Comp.css";
import { useNavigate } from "react-router";
import { useFierbase } from "../context/fierbasecontext";

const Navbar = () => {
  const navigate = useNavigate();  
  const firebase = useFierbase();

  return (
    <Box>
      <BottomNavigation showLabels>
        <BottomNavigationAction
          label="Home"
          style={{ borderTopLeftRadius: "30px" }}
          icon={<IoMdHome />}
          onClick={() => {
            navigate("/home");
          }}
        />
      
        <BottomNavigationAction
          label="Notifications"
          style={{ borderTopRightRadius: "30px" }}
          icon={<MdOutlineNotificationsNone />}
          onClick={() => {
            navigate("/notification");
          }}
        />
      </BottomNavigation>
    </Box>
  );
};

export default Navbar;
