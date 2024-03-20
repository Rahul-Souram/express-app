const express = require("express");
const app = express();
require("dotenv").config();
const logger = require("morgan");
const path = require("path");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");

const PORT = process.env.PORT || 8000;

connectDB();
// Built-in Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Router middleware
app.get("/", (req, res) => {
  res.json({ message: "Contact App" });
});

// logger
app.use(logger("dev"));

// Include contactRoute after logger middleware
app.use("/api/users", require("./routes/contactRoute"));

// error page
app.all("*", (req, res, next) => {
  res.status(404);
  next(new Error("Route not found"));
});

// Include errorHandler middleware after all routes
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running on port:${PORT}`);
});
