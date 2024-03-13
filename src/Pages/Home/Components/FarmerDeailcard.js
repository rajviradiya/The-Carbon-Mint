import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Col, Container, Row } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import { TbZoomQuestion } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { GiFarmer } from "react-icons/gi";

const FarmerDeailcard = () => {

  const navigate = useNavigate()

  return (
    <Container fluid className="farmdetailcontainer">
      <Card className="farmerdetailshomepage">
        <Col className="farmerdetailshomepagecol">
          <Row className="Farmerlocation">
            <Link to="/farm" className="Farmerdetaillink">
              <span>Farmer Name</span>
              <p>Farmer Location</p>
            </Link>
          </Row>
          <Row className="farmerbuttons">
              <button className="farmdetailbutton" onClick={()=>navigate("/event")}>
                <FiEdit className="farmicon" />
              </button>
              <button className="farmdetailbutton">
                <GiFarmer className="farmicon" />
              </button>
              <button className="farmdetailbutton">
                <TbZoomQuestion className="farmicon" />
              </button>
          </Row>
        </Col>
      </Card>
    </Container>
  );
};

export default FarmerDeailcard;
