import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function HMP() {
  const [isStarting, setIsStarting] = useState(false);
  let status = "down";
  let count = 0;
  const [countLabel, setCountLabel] = useState(0);
  const URL = "/lib/";
  let videoElement, videoSelect, canvas;
  let selectors = [videoSelect];
  const width = 300;
  const height = 300;
  navigator.mediaDevices
    .enumerateDevices()
    .then(gotDevices)
    .catch(handleError);
  function handleError(error) {
    console.log(
      "navigator.MediaDevices.getUserMedia error: ",
      error.message,
      error.name
    );
  }
  function gotStream(stream) {
    console.log("gotStream");
    window.stream = stream; // make stream available to console
    videoElement.srcObject = stream;
    // Refresh button list in case labels have become available
    return navigator.mediaDevices.enumerateDevices();
  }
  function gotDevices(deviceInfos) {
    console.log("gotDevices");
    // Handles being called several times to update labels. Preserve values.
    const values = selectors.map((select) => select.value);
    selectors.forEach((select) => {
      while (select.firstChild) {
        select.removeChild(select.firstChild);
      }
    });
    for (let i = 0; i !== deviceInfos.length; ++i) {
      const deviceInfo = deviceInfos[i];
      const option = document.createElement("option");
      option.value = deviceInfo.deviceId;
      if (deviceInfo.kind === "videoinput") {
        option.text = deviceInfo.label || `camera ${videoSelect.length + 1}`;
        videoSelect.appendChild(option);
      } else {
        console.log("Some other kind of source/device: ", deviceInfo);
      }
    }
    selectors.forEach((select, selectorIndex) => {
      if (
        Array.prototype.slice
          .call(select.childNodes)
          .some((n) => n.value === values[selectorIndex])
      ) {
        select.value = values[selectorIndex];
      }
    });
  }
  const init = async () => {
    videoElement = document.querySelector("video");
    videoSelect = document.querySelector("select#videoSource");
    selectors = [videoSelect];

    if (window.stream) {
      window.stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    const videoSource = videoSelect.value;

    const constraints = {
      video: { deviceId: videoSource ? { exact: videoSource } : undefined },
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(gotStream)
      .then(gotDevices)
      .catch(handleError);

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // // // load the model and metadata
    // // // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // // // Note: the pose library adds a tmPose object to your window (window.tmPose)
    model = await window.tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // // // Convenience function to setup a webcam

    // // const flip = true; // whether to flip the webcam
    // // webcam = new window.tmPose.Webcam(width, hegiht, flip); // width, height, flip
    // // await webcam.setup(); // request access to the webcam

    // const flip = true; // whether to flip the webcam
    // webcam = new window.tmPose.Webcam(width, height, flip); // width, height, flip
    // await webcam.setup(); // use "user" to use front-cam on mobile phones
    // webcam.play();

    window.requestAnimationFrame(loop);

    canvas = document.getElementById("canvas");
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d");

    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
      // and class labels
      labelContainer.appendChild(document.createElement("div"));
    }
    setIsStarting(true);
  };
  const loop = async (timestamp) => {
    // webcam.update(); // update the webcam frame
    ctx.drawImage(videoElement, 0, 0, width, height);
    await predict();
    window.requestAnimationFrame(loop);
  };

  const predict = async () => {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await model.estimatePose(canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);
    prediction.sort((x, y) => y.probability - x.probability);
    console.log(prediction[0].className);
    if (prediction[0].probability >= 0.99) {
      if (prediction[0].className == "down") {
        console.log(count);
        status = "down";
      } else if (prediction[0].className == "up") {
        if (status == "down") {
          count = count + 1;
        }
        console.log(count);
        status = "up";
      }
    }

    for (let i = 0; i < maxPredictions; i++) {
      const classPrediction =
        prediction[i].className + ": " + prediction[i].probability.toFixed(2);
      labelContainer.childNodes[i].innerHTML = classPrediction;
    }
    setCountLabel(count);
    // finally draw the poses
    drawPose(pose);
  };

  const drawPose = (pose) => {
    if (canvas) {
      ctx.drawImage(canvas, 0, 0);
      // draw the keypoints and skeleton
      if (pose) {
        const minPartConfidence = 0.5;
        window.tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
        window.tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
      }
    }
  };
  let model, webcam, ctx, labelContainer, maxPredictions;
  return (
    <Container>
      <Row>
        <Col className="d-grid gap-2">
          <div className="select">
            <label htmlFor="videoSource">Video source: </label>
            <select id="videoSource"></select>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="d-grid gap-2">
          <video
            id="video"
            width="300"
            height="300"
            playsInline
            autoPlay
          ></video>
        </Col>
      </Row>
      <Row>
        <Col className="d-grid gap-2">
          {/* <div className="video">&nbsp;</div> */}
          {/* <button type="button" onClick={init}>
            Start
          </button> */}
          <canvas id="canvas"></canvas>
          <div id="label-container"></div>
          {countLabel}
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          {isStarting ? (
            <Link
              to={{ pathname: "/hmp/result/" + countLabel }}
              className="d-grid gap-2"
              style={{ textDecoration: "none" }}
            >
              <Button className="fixed-bottom Button-End" variant="warning">
                End
              </Button>
            </Link>
          ) : (
            <Button
              className="fixed-bottom Button-End"
              variant="warning"
              onClick={init}
            >
              START
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default HMP;
