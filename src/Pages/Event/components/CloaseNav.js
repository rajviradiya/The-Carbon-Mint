import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { CgClose } from "react-icons/cg";
import { Link } from "react-router-dom";

const CloaseNav = () => {
  // const history = useHistory();

  // const goBack = () => {
  //   history.goBack(); // This will navigate back to the previous page in the history stack
  // };

  return (
    <div className="closeeventnav">
      <div className="closeicondiv">
        {/* <button onClick={goBack}> */}
          <CgClose />
        {/* </button> */}
      </div>
      <div className="closenavtext">
        <section>
          <span>Landparcel - Intervention</span>
          <br />
          <p>Sorghum, Chinnaiah Polam, Kashimnagar</p>
        </section>
      </div>
    </div>
  );
};

export default CloaseNav;
