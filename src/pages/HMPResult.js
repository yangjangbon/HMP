import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

function HMPResult() {
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const { count } = useParams();
  const curr = new Date();
  const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
  const kr_curr = new Date(utc + KR_TIME_DIFF);
  return (
    <Container>
      <Row>
        <Col className="d-grid gap-2">
          <div className="Book-Title">
            How Many Pull-ups?
            <br /> Date
            <br /> {kr_curr.getFullYear()} / {kr_curr.getMonth()} /{" "}
            {kr_curr.getDay()}
            <br /> Count
            <br /> {count}
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
