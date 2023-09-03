import mongoose, { Document, Schema, Model } from "mongoose";

// 定義 User 的資料結構
interface InterfaceUser extends Document {
  name?: string;
  email: string;
  photo?: string;
  password: string;
  passwordConfirm: string;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  active?: boolean;
}
// 定義 User 的靜態方法與實例方法

interface IUserModel extends Model<InterfaceUser> {
  // 靜態方法
}

const userSchema: Schema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
  },
  photo: { type: String, default: "default.jpg" },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false, //never show in any output
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    select: false,
    validate: {
      // This only works on CREATE and SAVE!!
      validator: function (this: InterfaceUser, el: string): boolean {
        return el === this.password;
      },
      message: "Passwords are not the same",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

const User: IUserModel = mongoose.model<InterfaceUser>("User", userSchema);
module.exports = User;
