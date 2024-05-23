const express = require("express");

const calculatePersonLocation = require("./calculatePersonLocation");

const port = process.env.PORT | 4000;

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  next();
});

app.get("/", (req, res) => {
  console.log("HERE");
  res.status(200).send({ message: "Hello world!" });
});

app.get("/getlocation", (req, res) => {
  // Extracting details from query parameters

  const side = parseFloat(req.query.side);
  const speed = parseFloat(req.query.speed);
  const prevPositions = JSON.parse(req.query.positions);

  // Calculate the location of each person
  const locations = calculatePersonLocation(side, speed, prevPositions);

  res.json({ locations });
});

app.listen(port, () => console.log("Server is running on port " + port));
