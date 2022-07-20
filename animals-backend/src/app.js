const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: ["superfarmer.io"],
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

app.use(express.static(path.resolve(__dirname, "./build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./build", "index.html"));
});

module.exports = app;
