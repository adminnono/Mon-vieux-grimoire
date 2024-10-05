const express = require("express");
const app = express();
const cors = require("cors");

const PORT = 4000;

app.use(cors());
app.use(express.json());

function sayHi(req, res) {
  res.send("Hello World");
}

app.get("/", sayHi);
app.post("/api/auth/signup", signUp);
app.post("/api/auth/login", login);

app.listen(PORT, function () {
  console.log("server is running on: ${PORT}");
});

function signUp(req, res) {
  console.log("req:", req);
  const body = req.body;
  res.send("sign up");
}

function login(req, res) {
  const body = req.body;
  console.log("body:", body);
  req.send("Login");
}
