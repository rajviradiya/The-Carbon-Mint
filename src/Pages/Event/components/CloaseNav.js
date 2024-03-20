import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { CgClose } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { useFierbase } from "../../../context/fierbasecontext";

const CloaseNav = ({handleClosenav}) => {
  return (
    <Container className="closeeventnav">
      <div className="closeicondiv">
        <button onClick={() => handleClosenav()}>
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
    </Container>
  );
};

export default CloaseNav;
