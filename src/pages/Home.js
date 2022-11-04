import React, { Component } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const backurl = "34.64.173.117:8883";

class Home extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <div className="Book-Title">
              How
              <br /> Many
              <br /> Pull-ups?
            </div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Link
              to={{ pathname: "/hmp" }}
              className="d-grid gap-2"
              style={{ textDecoration: "none" }}
            >
              <Button className="ButtonTag" variant="warning">
                How many pull-ups
              </Button>
            </Link>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Link
              to={{ pathname: "/exercise" }}
              className="d-grid gap-2"
              style={{ textDecoration: "none" }}
            >
              <Button className="ButtonTag" variant="warning">
                Exercise
              </Button>
            </Link>
          </Col>
        </Row>
        <br />
        {/* <Row>
          <Col className="d-grid gap-2">
            <Button>Dashboard</Button>
          </Col>
        </Row> */}
      </Container>
    );
  }
}

export default Home;
