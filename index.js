const express = require("express");
const app = express();
const port = 8082;
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is Running at Port ${port}`);
});

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Server Is Running !", //json()sends only json data
  });
});

// For all non existing Routes
app.get("*", (req, res) => {
  res.status(404).send({
    msg: "Route does not exist",
  });
});
