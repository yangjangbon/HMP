import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function HMPResult() {
  return (
    <Container>
      <Row>
        <Col className="d-grid gap-2">
          <div className="Book-Title">
            How Many Pull-ups?
            <br /> Date
            <br /> 2022 / 11 / 11
            <br /> Count
            <br /> 7
          </div>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <Link to={{ pathname: "/" }} className="d-grid gap-2">
            <Button className="fixed-bottom Button-End" variant="warning">
              OK
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default HMPResult;
