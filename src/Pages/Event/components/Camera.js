import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BsFillCameraFill } from "react-icons/bs";
import CameraImg from "./CameraImg";
import { useNavigate } from "react-router-dom";
import { useFierbase } from "../../../context/fierbasecontext";

const Camera = () => {

  const navigate = useNavigate()
  const fierbase = useFierbase()

  console.log(fierbase.imageurl)

  return (
    <Container fluid className="cameracomp">
      <section className="cameratext">
        <p>Tap on camera icon to capture photos</p>
      </section>
      <section className="cameraimage">
        <div className="cameraimagess">
          {fierbase.imageurl && fierbase.imageurl.map((items,index) => (
            <>
            <CameraImg key={index} image={items} index={index}/>
            </>
          ))}
          <button className="addphoto" onClick={() => navigate("/cam")}>
            <BsFillCameraFill />
          </button>
        </div>
      </section>
    </Container>
  );
};

export default Camera;
