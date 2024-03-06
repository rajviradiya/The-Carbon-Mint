import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Col, Container, Row } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import { TbZoomQuestion } from "react-icons/tb";
import { Link } from "react-router-dom";
import { GiFarmer } from "react-icons/gi";

const FarmerDeailcard = () => {
  return (
    <Card className="farmerdetailshomepage">
      <Container fluid className="farmdetailcontainer">
        <Row className="Farmerlocation">
          <Link to="/" className="Farmerdetaillink">
            <Card.Body>
              <Card.Text className="fs-3 fw-bold">Farmer Name</Card.Text>
              <Card.Text className="fs-6 fw-normal">Farmer Location</Card.Text>
            </Card.Body>
          </Link>
        </Row>
        <Row className="farmerbuttons">
          <Card.Body>
            <button className="farmdetailbutton">
              <div>
                <FiEdit className="farmicon" />
              </div>
            </button>
            <button className="farmdetailbutton">   
              <div>
                <GiFarmer className="farmicon" />
              </div>
            </button>
            <button className="farmdetailbutton">
              <div>
                <TbZoomQuestion className="farmicon" />
              </div>
            </button>
          </Card.Body>
        </Row>
      </Container>
    </Card>
  );
};

export default FarmerDeailcard;
