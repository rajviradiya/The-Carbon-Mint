import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import BackNav from "./Components/BackNav";

const index = () => {
  return (
    <Container fluid className="Profilecont">
      <Col className="ProfileCol">
        <Row className="BackNavRow">
          <BackNav />
        </Row>
        <Row>wfeewf</Row>
        <Row>wefewew</Row>
      </Col>
    </Container>
  );
};

export default index;
