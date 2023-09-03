"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppError = require("../utils/appError");
const handleDuplicateFieldsDB = (err) => {
    const value = String(Object.values(err.keyValue));
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(400, message);
};
const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join(". ")}`;
    return new AppError(400, message);
};
const sendError = (err, _req, res) => {
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
module.exports = (err, req, res, _next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    let error = { ...err };
    error.message = err.message;
    console.log("error", error);
    if (error.code === 11000)
        error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError" ||
        error.message.includes("validation failed"))
        error = handleValidationErrorDB(error);
    sendError(error, req, res);
};
//# sourceMappingURL=errorController.js.map