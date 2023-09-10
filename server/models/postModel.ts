import mongoose, { Document, Schema } from "mongoose";

interface InterfacePost extends Document {
  user: string;
  location: string;
  paragraph: string;
  photo: string;
}
const postSchema: Schema = new Schema({
  paragraph: {
    type: String,
    required: [true, `The paragraph can't be empty`],
  },
  writter: {
    type: mongoose.Schema.ObjectId,
    ref: "User", //另一個 schema 的名字
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  locations: [
    {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
      address: String,
      description: String,
      day: Number,
    },
  ],
  likeCount: {
    type: Number,
  },
  tagName: [String],
});

const Post = mongoose.model<InterfacePost>("Post", postSchema);
module.exports = Post;
