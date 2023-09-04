import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");

const catchAsync = require("../utils/catchAsync");

const User = require("./../models/userModel");
const AppError = require("../utils/appError");

interface InterfaceSignup {
  body: {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
  };
}

const signToken = (id: string) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user: any, statusCode: number, res: any) => {
  // in mongoDB is call _id
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRES_IN!) * 24 * 60 * 60 * 1000
    ),
    secure: true, // ssl
    httpOnly: true,
  };
  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req: InterfaceSignup, res: any) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError(400, "Please provide email and password!"));
    }
    // To compare password, should output this field
    const user = await User.findOne({ email }).select("+password");

    if (!user || !user.correctPassword(password, user.password)) {
      return next(new AppError(401, "Incorrect email or password"));
    }

    createSendToken(user, 200, res);
  }
);
