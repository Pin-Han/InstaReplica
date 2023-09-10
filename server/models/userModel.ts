import mongoose, { Document, Schema, Model } from "mongoose";
const crypto = require("crypto");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
    validate: [validator.isEmail, "Please provide a valid email"],
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

// Between getting the data and saving it to the DB
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);

  // After mongo validator the password and passwordConfirm are same
  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp: number) {
  if (this.passwordChangedAt) {
    const originTimestamp: number = this.passwordChangedAt.getTime() / 1000;

    const changedTimestamp = parseInt(String(originTimestamp), 10);
    console.log("changedPasswordAfter", this.passwordChangedAt, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }
  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User: IUserModel = mongoose.model<InterfaceUser>("User", userSchema);
module.exports = User;
