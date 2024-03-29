import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import { TbZoomQuestion } from "react-icons/tb";
import { GiFarmer } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import Sorghum from "../../../Assets/Crops/sorghum_243902974 2.png"

const CropCard = ({items}) => {
  const navigate = useNavigate()

  console.log(items,"otems")
  return (
    <Container className="CropCont">
      <div className="cropcard">
        <div className="cropp1">
          <Link to={`/crop/${items.id}`} className="Farmerdetaillink">
            <img
              variant="top"
              src={`${items.image}`}
            />
          </Link>
        </div>
        <div className="cropp2">
          <div className="cropcontlink">
            <Link to={`/crop/${items.id}`} className="Farmerdetaillink">
              <span>{items?.feild}</span>
              <p className="p2">{items?.name}</p>
            </Link>
          </div>
          <div className="cropbutton-group">
            <button className="cropbutton"  onClick={()=>{navigate("/event")}}>
                  <FiEdit className="cropicon" />
            </button>
            <button className="cropbutton">
                <GiFarmer className="cropicon" />
            </button>
            <button className="cropbutton">
                <TbZoomQuestion className="cropicon" />
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CropCard;
