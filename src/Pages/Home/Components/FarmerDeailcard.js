import React from "react";
import Card from "react-bootstrap/Card";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFierbase } from "../../../context/fierbasecontext";
import { LuPlus } from "react-icons/lu";

const FarmerDeailcard = () => {
  const firebase = useFierbase();
  const navigate = useNavigate()

  return (
    <Container fluid className="farmdetailcontainer">
      <Link to={`/farm/${firebase?.userdata?.Landparcel}`} className="Farmerdetaillink">
        <Card className="farmerdetailshomepage" style={{ backgroundImage: `url(${firebase?.userdata && firebase?.userdata?.ProfilePic})` }}>
          <div className="Farmerlocation">
            <span>{firebase?.userdata?.city}</span>
            <p>{firebase?.userdata && firebase?.userdata?.district}{firebase?.userdata && firebase?.userdata?.state}</p>
          </div>
        </Card>
      </Link>
      <button className="farmdetailbutton" onClick={() => navigate(`/event/${firebase?.userdata?.Landparcel}`)}>
        <LuPlus className="farmicon" />
      </button>
    </Container>
  );
};

export default FarmerDeailcard;
