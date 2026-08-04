const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/login", (req, res) => {
  res.send(" Login Page Loading");
});

app.listen(port, () => {
  console.log(`Server is starting on http://localhost:${port}`);
});
