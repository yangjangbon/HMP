import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function HMP() {
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
          <Link
            to={{ pathname: "/hmp/result" }}
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
}

export default HMP;
