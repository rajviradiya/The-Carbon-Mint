import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { IoMdHome } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { TbZoomQuestion } from "react-icons/tb";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { Container } from "react-bootstrap";

import "./Comp.css";

const Navbar = () => {
  const [value, setValue] = React.useState(0);

  console.log(value, "vals");

  return (
      <Box>
        <BottomNavigation showLabels>
          <BottomNavigationAction label="Home" icon={<IoMdHome />} />
          <BottomNavigationAction label="Input Log" icon={<FiEdit />} />
          <BottomNavigationAction label="Query" icon={<TbZoomQuestion />} />
          <BottomNavigationAction
            label="Notifications"
            icon={<MdOutlineNotificationsNone />}
            onClick={() => alert("zeroooos")}
          />
        </BottomNavigation>
      </Box>
  );
};

export default Navbar;
