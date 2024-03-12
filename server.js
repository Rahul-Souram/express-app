const express = require("express");
const app = express();
require("dotenv").config();
const logger = require("morgan");
const path = require("path");

const PORT = process.env.PORT || 8000;

// Built-in Middle ware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Router middleware
app.get("/", (req, res) => {
  res.json({ message: "Contact App" });
});

// logger
app.use(logger("dev"));

app.use("/api/users", require("./routes/contactRoute"));

// Error handling Middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);

  switch (statusCode) {
    case 401:
      res.json({
        error: "UnAuthorized",
        message: err.message,
      });
      break;
    case 404:
      res.json({
        error: "Page not found",
        message: err.message,
      });
      break;
    case 500:
      res.json({
        error: "Server Error",
        message: err.message,
      });
      break;

    default:
      break;
  }
};

// error page
app.all("*", (req, res) => {
  res.status(404);
  throw new Error("Route not found");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running on port:${PORT}`);
});
