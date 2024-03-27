import React from "react";
import { Container, } from "react-bootstrap";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router";
import { useFierbase } from "../../../context/fierbasecontext";


const CloaseNav = () => {
  const navigate = useNavigate()
  const firebase = useFierbase()

  return (
    <Container className="closeeventnav">
      <div className="closeicondiv">
        <button onClick={() => {
          navigate("/home")
          firebase.setImageUrl([])
          firebase.setRecording(false)
          firebase.setUploadProgress([])
          }}>
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
