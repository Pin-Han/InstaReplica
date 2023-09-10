import { NextFunction, Response } from "express";

const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");

interface InterfaceUser {
  params: any;
  body: any;
  user: any;
}

exports.getSelf = catchAsync(
  async (req: InterfaceUser, res: Response, _next: NextFunction) => {
    req.params.id = req.user.id;
    const user = await User.findById(req.params.id);

    return res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  }
);
