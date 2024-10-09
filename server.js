const express = require("express");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const routes = require("./routes");
const { verifyToken } = require("./middleware/jwtMiddleware");
const db = require("./config/databaseConfig");
const { SECRET_KEY } = require("./constants/constants");

const app = express();
const port = 3010;

// Database connection
db.authenticate()
  .then(() => {
    console.log("Database Connected! :)");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", routes);
// Base Route
app.get("/", (req, res) => {
  res.send("API is running ok! :)");
});

// Listen on port
app.listen(port, () => {
  console.log("Server is running on port:", port);
});
