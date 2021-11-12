const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Connect in database
mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://gildofj:maeeu123@cluster0.eqown.mongodb.net/pdi?retryWrites=true&w=majority",
);
mongoose.connection.on(
  "error",
  console.error.bind(console, "Error on connection database!"),
);
mongoose.connection.once("open", () => {
  console.log("Connected to database!");
});

app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

// Parse application/json
app.use(express.json());

// Models
require("./Models/User");
require("./Models/Product");

// Routes
require("./Controllers/UsersController")(app);
require("./Controllers/ProductsController")(app);

//server connect
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server run in port: ${PORT}`);
});
