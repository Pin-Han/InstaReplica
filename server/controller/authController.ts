import { Request, Response as ExpressResponse } from "express";
import { Controller, Route, SuccessResponse, Response, Post, Tags } from "tsoa";
const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");
const User = require("./../models/userModel");
// interface UserCreationParams {
//   name: string;
//   password: string;
//   passwordConfirm: string;
//   email: string;
// }

@Route("/user")
@Tags("User")
export class AuthController extends Controller {
  constructor() {
    super();
  }

  @Post("/")
  @SuccessResponse(201, "User Created Successfully")
  @Response(401, "Bad Request")
  public signup = catchAsync(
    async (
      req: Request,
      res: ExpressResponse,
      next: Function
    ): Promise<void> => {
      try {
        await User.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          passwordConfirm: req.body.passwordConfirm,
        });
        res.status(201).send({ message: "User Created Successfully" });
      } catch (error: any) {
        console.error(error);
        return next(new AppError(401, error.message));
      }
    }
  );
}
