import { Request, Response, NextFunction } from "express";

const AppError = require("../utils/appError");

const handleDuplicateFieldsDB = (err: any) => {
  const value = String(Object.values(err.keyValue));
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(400, message);
};

const handleValidationErrorDB = (err: any) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(400, message);
};

const sendError = (err: any, _req: Request, res: Response) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Something went very wrong!",
  });
};

module.exports = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let error = { ...err };
  error.message = err.message;
  console.log("error", error);
  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (
    error.name === "ValidationError" ||
    error.message.includes("validation failed")
  )
    error = handleValidationErrorDB(error);
  sendError(error, req, res);
};
