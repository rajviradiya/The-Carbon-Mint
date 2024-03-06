import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import { TbZoomQuestion } from "react-icons/tb";
import { GiFarmer } from "react-icons/gi";

const CropCard = () => {
  return (
    <Card className="cropcard">
      <Container className=" cropcont">
        <Col className="cropcol"> 
          <Row className="cropp1">
              <Card.Img
                variant="top"
                src="data:image/jpeg;base64,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"
              />
          </Row>
          <Row className="cropp2">
              <Card.Body>
                <Card.Text className="p1">Corner field</Card.Text>
                <Card.Text className="p2">Shorghum</Card.Text>
                <div className="cropbuttonsss">
                  <button className="cropbutton">
                    <div>
                      <FiEdit className="cropicon" />
                    </div>
                  </button>
                  <button className="cropbutton">
                    <div>
                      <GiFarmer className="cropicon" />
                    </div>
                  </button>
                  <button className="cropbutton">
                    <div>
                      <TbZoomQuestion className="cropicon" />
                    </div>
                  </button>
                </div>
              </Card.Body>
          </Row>
        </Col>
      </Container>
    </Card>
  );
};

export default CropCard;
