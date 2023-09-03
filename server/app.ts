// import path from "path";
const express = require("express");
import { Request, Response, NextFunction } from "express";

const cookieParser = require("cookie-parser");
import { RegisterRoutes } from "./public/routes";

const userRouter = require("./routes/userRoutes");

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(cookieParser());
RegisterRoutes(app);
// add limiter

// against xss
app.get("/", (_req: Request, res: Response) => {
  res.send("Hello from Space! 🚀");
});
app.get("/test", (_req: Request, res: Response) => {
  res.send("Hello from Space! 🚀");
});
app.use("/api/user", userRouter);
app.all("*", (req: Request, res: Response, _next: NextFunction) => {
  res
    .status(404)
    .json({ message: `Can't find ${req.originalUrl} on this server!` });
});

module.exports = app;
