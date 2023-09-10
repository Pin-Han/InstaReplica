import { NextFunction, Response } from "express";

const Post = require("./../models/postModel");

const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createPost = catchAsync(
  async (req: any, res: Response, _next: NextFunction) => {
    const newPost = await Post.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        post: newPost,
      },
    });
  }
);
