"use strict";
class AppError extends Error {
    statusCode;
    status;
    isOperational;
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "Fail" : "Error";
        // TODO: error handle in the future
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
module.exports = AppError;
//# sourceMappingURL=appError.js.map