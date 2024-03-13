import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { CgClose } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";

const CloaseNav = () => {

  const navigate = useNavigate()

  return (
    <div className="closeeventnav">
      <div className="closeicondiv">
        <button onClick={()=>{navigate("/home")}}>
          <CgClose />
        </button>
      </div>
      <div className="closenavtext">
        <section>
          <span>Landparcel - Intervention</span>
          <br />
          <p>Sorghum, Chinnaiah Polam, Kashimnagar</p>
        </section>
      </div>
    </div>
  );
};

export default CloaseNav;
