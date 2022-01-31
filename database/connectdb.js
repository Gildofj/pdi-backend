const mongoose = require("mongoose");

// Connect in database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
mongoose.connection.on(
  "error",
  console.error.bind(console, "Error on connection database!"),
);
mongoose.connection.once("open", () => {
  console.log("Connected to database!");
});
