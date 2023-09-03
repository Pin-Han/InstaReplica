class AppError extends Error {
  public statusCode: number;
  public status: string;
  public isOperational: boolean;

  constructor(statusCode: number, message: string) {
    super(message); // 呼叫父類的 constructor

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    // 獲取堆疊追踪
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
