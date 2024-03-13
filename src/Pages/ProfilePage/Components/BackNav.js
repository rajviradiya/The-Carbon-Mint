import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import "../Profile.css";
import { MdLogout } from "react-icons/md";
import LogoutModal from "./LogoutModal";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router";

const BackNav = () => {

  const navigate = useNavigate()

  return (
      <Container className="BackNav">
        <button className="backicondiv" onClick={()=> navigate("/home")}>
          <IoIosArrowRoundBack className="Backicon" />
        </button>
        <div className="contant">
          <p>Farmer Profile</p>
        </div>
        <div class="dropdown">
          <button class="dropbtn">
            <BsThreeDotsVertical />
          </button>
          <div class="dropdown-content">
              <LogoutModal />
          </div>
        </div>
      </Container>
  );
};

export default BackNav;
