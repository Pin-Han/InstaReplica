declare class AppError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;
    constructor(statusCode: number, message: string);
}
export default AppError;
