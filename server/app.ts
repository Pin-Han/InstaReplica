// import path from "path";
const express = require("express");
import { Request, Response, NextFunction } from "express";

const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");
const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(cookieParser());

// add limiter

// against xss
app.get("/", (_req: Request, res: Response) => {
  res.send("Hello from Space! 🚀");
});
app.get("/test", (_req: Request, res: Response) => {
  res.send("Hello from Space! 🚀");
});
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

app.all("*", (req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(404, `Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);

module.exports = app;
