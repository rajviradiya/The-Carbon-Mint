import React, { useState } from "react";
import { Container, } from "react-bootstrap";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router";
import { useFierbase } from "../../../context/fierbasecontext";
import Skeleton from '@mui/material/Skeleton';

const CloaseNav = ({ landparcel,crop,landparcel2 }) => {
  const navigate = useNavigate()
  const firebase = useFierbase()
 
  if (!firebase?.multipleLandParcel?.LandParcels) {
    return <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
  }

  console.log(landparcel,"dddddddddddddddddd")
  return (
    <Container className="closeeventnav">
      <div className="closeicondiv">
        <button onClick={() => {
          navigate("/home")
          firebase.setImageUrl([])
          firebase.setRecording(false)
        }}>
          <CgClose />
        </button>
      </div>
      <div className="closenavtext">
        <section>
          <span>{landparcel?.Landparcel || landparcel2?.Landparcel} - Intervention</span>
          <br />
          <p>{landparcel?.Landparcel || crop?.name}, {landparcel?.city || landparcel2?.city}, {landparcel?.district || landparcel2?.district}</p>
        </section>
      </div>
    </Container>
  );
};

export default CloaseNav;
