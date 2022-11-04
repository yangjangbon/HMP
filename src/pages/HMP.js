import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function HMP() {
  let count = 5;
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
            to={{ pathname: "/hmp/result/" + count }}
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
