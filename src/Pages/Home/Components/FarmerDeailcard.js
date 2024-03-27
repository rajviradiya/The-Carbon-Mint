import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Col, Container, Row } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import { TbZoomQuestion } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { GiFarmer } from "react-icons/gi";
import { useFierbase } from "../../../context/fierbasecontext";

const FarmerDeailcard = () => {

  const fierbase = useFierbase();
  const navigate = useNavigate()

  console.log(fierbase.userdata, "main user home ");
  return (
    <Container fluid className="farmdetailcontainer">
      <Card className="farmerdetailshomepage">
        <Col className="farmerdetailshomepagecol">
          <Row className="Farmerlocation">
            <Link to="/farm" className="Farmerdetaillink">
              <span>{fierbase.userdata ?.city}</span>
              <p>{fierbase.userdata && fierbase.userdata.district}{fierbase.userdata && fierbase.userdata.state}</p>
            </Link>
          </Row>
          <Row className="farmerbuttons">
              <button className="farmdetailbutton" onClick={()=>navigate("/event")}>
                <FiEdit className="farmicon" />
              </button>
              <button className="farmdetailbutton" onClick={()=>navigate("")}>
                <GiFarmer className="farmicon" />
              </button>
              <button className="farmdetailbutton">
                <TbZoomQuestion className="farmicon" onClick={()=>navigate("")}/>
              </button>
          </Row>
        </Col>
      </Card>
    </Container>
  );
};

export default FarmerDeailcard;
