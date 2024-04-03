import React from "react";
import { Container, } from "react-bootstrap";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router";

const CloseNavRedirect = ({closenavigateparams}) => {
  const navigate = useNavigate()

  return (
    <Container className="closeeventnavredirect" >
      <div className="closeicondivredirect">
        <button onClick={() => navigate(`/event/${closenavigateparams}`)}>
          <CgClose />
        </button>
      </div>
      <div className="closenavtextredirect">
        <section>
          <span>Landparcel - Intervention</span>
          <br />
          <p>Sorghum, Chinnaiah Polam, Kashimnagar</p>
        </section>
      </div>
    </Container>
  )
}

export default CloseNavRedirect
