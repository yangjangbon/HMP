import React from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const ExerciseResult = () => {
  return (
    <Container>
      <Row>
        <Col className="d-grid gap-2">
          <div className="Book-Title">
            Exercise
            <br /> Date
            <br /> 2022 / 11 / 11
            <br /> Count
            <br /> 5 / 5 / 4 / 3 /1
            <br /> Rest Seconds
            <br /> 60
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
};

export default ExerciseResult;
