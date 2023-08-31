const crypto = require("crypto");
const { promisify } = require("util");

const User = require("./../models/userModel");

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    res.status(200).json({ message: "saved successfully" });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};
