const express = require("express");
const bodyparser = require("body-parser");
const app = express();

const host = "localhost";
const port = 8000;

app.use(bodyparser.json());

app.get("/", (req, res) => {
  const status = {
    status: "ok",
    text: "The server is working fine",
  };
  res.json(status);
});

app.get("/data", (req, res) => {
  const status = {
        status: "ok",
    text: "data page works",
  };
  res.json(status);
});

app.post("/data", (req, res) => {
  const user = req.body;
  res.send(user);
});

app.listen(port, (req, res) => {
  console.log(`The server is running at http://${host}:${port}`);
});
