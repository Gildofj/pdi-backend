const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");

if (process.env.NODE_ENV !== "production") {
  // Load environment variables from .env file in non prod environments
  require("dotenv").config();
}
require("./database/connectdb");

const app = express();

app.use(cookieParser(process.env.COOKIE_SECRET));

// Add the client URL to the CORS policy

const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(",")
  : [];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },

  credentials: true,
};

app.use(cors(corsOptions));

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
require("./models/user");
require("./models/product");
require("./models/company");

// Auth
require("./strategies/JwtStrategy");
require("./strategies/LocalStrategy");
require("./authenticate");

// Routes
require("./controllers/usersController")(app);
require("./controllers/productsController")(app);
require("./controllers/accountController")(app);

// Passport initialize
app.use(passport.initialize());

//server connect
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server run in port: ${PORT}`);
});
