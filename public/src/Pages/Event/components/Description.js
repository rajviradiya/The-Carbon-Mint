import React from "react";
import { Container } from "react-bootstrap";

const Description = () => {
  return (
    <Container className="EventDescription">
      <span>Please write a notes below</span>
      <textarea placeholder="Notes Hear..."/>
      <p>Max 500</p>
    </Container>
  );
};

export default Description;
