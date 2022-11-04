import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const Timer = () => {
  const backurl = "34.64.173.117:8883";
  const MIN = 25;
  const navigate = useNavigate();
  const { branchName } = useParams();
  const [bookmark, setBookmark] = useState(1);
  const [WPP, setWPP] = useState(100);
  const [minutes, setMinutes] = useState(parseInt(MIN));
  const [seconds, setSeconds] = useState(parseInt(0));
  const [started, setStarted] = useState(false);
  const [inputs, setInputs] = useState({
    start: 1,
    end: 1,
  });

  const timerStart = () => {
    setStarted(!started);
  };
  const deleteData = () => {
    const url = "http://" + backurl + "/branch";
    fetch(url, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ branchName: branchName }), // body data type must match "Content-Type" header
    })
      .then((response) => response.json()) // parses JSON response into native JavaScript objects
      .then((data) => {
        if (data.result.status === 200) {
          navigate("/");
        }
      }) // JSON-string from `response.json()` call
      .catch((error) => console.error(error));
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const commitData = () => {
    const { start, end } = inputs;
    let min = (MIN * 60 - (minutes * 60 + seconds)) / 60;
    let WPM = ((end - start + 1) * WPP) / min;
    navigate("/commit/" + branchName, { state: { WPM, start, end } });
  };
  const timerReset = () => {
    setStarted(false);
    setMinutes(parseInt(MIN));
    setSeconds(parseInt(0));
  };
  useEffect(() => {
    fetch("http://" + backurl + "/commit/" + branchName, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        let log = response.result.log;
        let wwp = response.result.WPP;
        setWPP(wwp);
        setBookmark(log[log.length - 1].end);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    if (started) {
      const countdown = setInterval(() => {
        if (parseInt(seconds) > 0) {
          setSeconds(parseInt(seconds) - 1);
        }
        if (parseInt(seconds) === 0) {
          if (parseInt(minutes) === 0) {
            clearInterval(countdown);
          } else {
            setMinutes(parseInt(minutes) - 1);
            setSeconds(59);
          }
        }
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [minutes, seconds, started]);
  return (
    <Container>
      <Form className="d-grid gap-2">
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Row>
            <Col>
              <div className="Book-Title">{branchName}</div>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <div className="Bookmark">Bookmark : {bookmark}</div>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <div className="Time-Counter">
                {minutes < 10 ? `0${minutes}` : minutes} :{" "}
                {seconds < 10 ? `0${seconds}` : seconds}
              </div>
            </Col>
          </Row>
          <br />
          <Row>
            <Col className="d-grid gap-2">
              <Button onClick={timerStart}>{started ? "STOP" : "START"}</Button>
            </Col>
            <Col className="d-grid gap-2">
              <Button onClick={timerReset}>RESET</Button>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Form.Label>Start Page</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="number"
                name="start"
                onChange={handleChange}
                placeholder=""
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Form.Label>End Page</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="number"
                name="end"
                onChange={handleChange}
                placeholder=""
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col className="d-grid gap-2">
              {/* <Link
                to={{ pathname: "/commit/" + { branchName } }}
                className="d-grid gap-2"
              > */}
              <Button onClick={commitData}>OK</Button>
              {/* </Link> */}
            </Col>
          </Row>
        </Form.Group>
      </Form>
      <Row>
        <Col></Col>
        <Col></Col>
        <Col className="d-grid gap-2">
          <Button onClick={deleteData}>{"Delete"}</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Timer;
