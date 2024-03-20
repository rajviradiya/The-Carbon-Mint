import React from "react";
import { Container,  } from "react-bootstrap";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router";


const CloaseNav = () => {
  const navigate = useNavigate()

  return (
    <Container className="closeeventnav">
      <div className="closeicondiv">
        <button onClick={() => navigate("/home")}>
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
