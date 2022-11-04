import React, { useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const Exercise = () => {
  const [inputs, setInputs] = useState({
    restSeconds: 0,
  });
  const count = [5, 5, 4, 2, 1];
  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
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
          <Form.Control
            size="lg"
            type="text"
            placeholder="Rest Seconds"
            onChange={handleChange}
            name="restSeconds"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Link
            to={{
              pathname:
                "/exercise/result/" +
                inputs.restSeconds +
                "/" +
                count[0] +
                "/" +
                count[1] +
                "/" +
                count[2] +
                "/" +
                count[3] +
                "/" +
                count[4],
            }}
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
