const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const http = require("http").createServer(app);

const port = 80;
app.use(cors());
app.use(express.static(path.join(__dirname, "/build")));
console.log(path.join(__dirname, "/build"));

app.get("/", (res, req) => {
  console.log("get /");
  req.sendFile(path.join(__dirname, "/build/index.html"));
});

app.get("*", (res, req) => {
  console.log("get *");
  req.sendFile(path.join(__dirname, "/build/index.html"));
});

http.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
