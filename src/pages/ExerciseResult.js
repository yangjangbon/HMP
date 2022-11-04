import React from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const ExerciseResult = () => {
  let { restSeconds, c1, c2, c3, c4, c5 } = useParams();

  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const curr = new Date();
  const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
  const kr_curr = new Date(utc + KR_TIME_DIFF);

  if (restSeconds == 0) {
    restSeconds = 60;
  }
  return (
    <Container>
      <Row>
        <Col className="d-grid gap-2">
          <div className="Book-Title">
            Exercise
            <br /> Date
            <br /> {kr_curr.getFullYear()} / {kr_curr.getMonth()} /{" "}
            {kr_curr.getDay()}
            <br /> Count
            <br /> {c1} / {c2} / {c3} / {c4} / {c5}
            <br /> Rest Seconds
            <br /> {restSeconds} Sec
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
