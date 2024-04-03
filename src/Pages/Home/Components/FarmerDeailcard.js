import React from "react";
import Card from "react-bootstrap/Card";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFierbase } from "../../../context/fierbasecontext";
import { LuPlus } from "react-icons/lu";

const FarmerDeailcard = () => {
  const fierbase = useFierbase();
  const navigate = useNavigate()
  return (
    <Container fluid className="farmdetailcontainer">
      <Link to="/farm" className="Farmerdetaillink">
        <Card className="farmerdetailshomepage" style={{ backgroundImage: `url(${fierbase?.userdata && fierbase?.userdata?.ProfilePic})` }}>
          <div className="Farmerlocation">
            <span>{fierbase?.userdata?.city}</span>
            <p>{fierbase?.userdata && fierbase?.userdata?.district}{fierbase?.userdata && fierbase?.userdata?.state}</p>
          </div>
        </Card>
      </Link>
      <button className="farmdetailbutton" onClick={() => navigate("/event")}>
        <LuPlus className="farmicon" />
      </button>
    </Container>
  );
};

export default FarmerDeailcard;
