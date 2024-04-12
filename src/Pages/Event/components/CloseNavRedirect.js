import React from "react";
import { Container, } from "react-bootstrap";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router";
import { useFierbase } from "../../../context/fierbasecontext";

const CloseNavRedirect = ({ params,crop, landparcel,landparcel2}) => {
  const navigate = useNavigate()
  return (
    <Container className="closeeventnavredirect" >
      <div className="closeicondivredirect">
        <button onClick={() => navigate(`/event/${params.id}`)}>
          <CgClose />
        </button>
      </div>
      <div className="closenavtextredirect">
        <section>
          <span>{ landparcel?.Landparcel || landparcel2.Landparcel} - Intervention</span>
          <br />
          <p>{ landparcel?.Landparcel || crop.name }, {landparcel?.city || landparcel2?.city}, {landparcel?.district || landparcel2.district}</p>
        </section>
      </div>
    </Container>
  )
}

export default CloseNavRedirect
