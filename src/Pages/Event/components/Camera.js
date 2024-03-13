import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BsFillCameraFill } from "react-icons/bs";
import CameraImg from "./CameraImg";

const Camera = () => {
  return (
    <Container fluid className="cameracomp">
      <section className="cameratext">
        <p>Tap on camera icon to capture photos</p>
      </section>
      <Container className="cameraimg">
        <Row className="cameraimgrow">
          <Col xs="auto" className="cameraimagecol">
            <CameraImg />
            <CameraImg />
            <CameraImg />
            <CameraImg />
            <CameraImg />

            <div className="addphoto ">
              <div className="cameraaicondiv">
                <BsFillCameraFill />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Camera;
