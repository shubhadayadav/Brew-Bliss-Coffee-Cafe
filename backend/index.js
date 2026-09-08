require("dotenv").config();
const express = require("express");
const connectDB= require("./config/db")
const cors = require("cors");

const app = express();

const PORT=process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.post("/api/reservation", (req, res) => {
  console.log(`Data received : `, req.body)
   res.json({ message: "Successfully get Reservation Data" });
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server is starting on ${PORT}`);
});
