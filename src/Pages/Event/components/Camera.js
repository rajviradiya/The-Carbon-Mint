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
      <section className="cameraimg">
        <Container>
          <Row>
            <Col xs="auto" className="d-flex flex-wrap p-0">
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
      </section>
    </Container>
  );
};

export default Camera;
