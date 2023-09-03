const path = require("path");

const express = require("express");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/userRoutes");

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(cookieParser());

// add limiter

// against xss
app.get("/test", (req, res) => {
  res.send("Hello from Space! 🚀");
});
app.use("/api/user", userRouter);
app.all("*", (req, res, _next) => {
  res
    .status(404)
    .json({ message: `Can't find ${req.originalUrl} on this server!` });
});

module.exports = app;
