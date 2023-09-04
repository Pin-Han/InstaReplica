"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import path from "path";
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const userRouter = require("./routes/userRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");
const app = express();
app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());
// add limiter
// against xss
app.get("/", (_req, res) => {
    res.send("Hello from Space! 🚀");
});
app.get("/test", (_req, res) => {
    res.send("Hello from Space! 🚀");
});
app.use("/api/user", userRouter);
app.all("*", (req, _res, next) => {
    next(new AppError(404, `Can't find ${req.originalUrl} on this server!`));
});
app.use(globalErrorHandler);
module.exports = app;
//# sourceMappingURL=app.js.map