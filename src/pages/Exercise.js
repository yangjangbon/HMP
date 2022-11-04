import React from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const Exercise = () => {
  return (
    <Container>
      <Row>
        <Col className="d-grid gap-2">
          <div className="video">&nbsp;</div>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <Form.Control size="lg" type="text" placeholder="Rest Seconds" />
        </Col>
      </Row>
      <Row>
        <Col>
          <Link
            to={{ pathname: "/exercise/result" }}
            className="d-grid gap-2"
            style={{ textDecoration: "none" }}
          >
            <Button className="fixed-bottom Button-End" variant="warning">
              End
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Exercise;
