import React from "react";
import Card from "react-bootstrap/Card";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFierbase } from "../../../context/fierbasecontext";
import { LuPlus } from "react-icons/lu";

const FarmerDeailcard = ({ landparceldata }) => {
  const navigate = useNavigate()
  return (
    <Container fluid className="farmdetailcontainer">
      <Link to={`/farm/${landparceldata?.id}`} className="Farmerdetaillink">
        <Card className="farmerdetailshomepage" style={{ backgroundImage: `url(${landparceldata?.ProfilePic})` }}>
          <div className="Farmerlocation">
            <span>{landparceldata?.city}</span>
            <p>{landparceldata?.district},  {landparceldata.state}</p>
          </div>
        </Card>
      </Link>
      <button className="farmdetailbutton" onClick={() => navigate(`/event/${landparceldata?.id}`)}>
        <LuPlus className="farmicon" />
      </button>
    </Container>
  );
};

export default FarmerDeailcard;
