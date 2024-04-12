import React from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { LuPlus } from "react-icons/lu";

const CropCard = ({ items }) => {
  const navigate = useNavigate()
  return (
    <Container className="CropCont">
      <Link to={`/crop/${items?.id}`} className="Cropdetaillink cropcard">
        <div className="cropp1">
          <img
            variant="top"
            src={`${items?.image}`}
            alt="Crop"
          />
        </div>
        <div className="cropp2">
          <div className="cropcontant">
            <span>{items?.feild}</span>
            <p className="p2">{items?.name}</p>
          </div>
        </div>
      </Link>
      <button className="cropbutton" onClick={() => { navigate(`/event/${items?.id}`) }}>
        <LuPlus className="cropicon" />
      </button>
    </Container>
  );
};

export default CropCard;
