const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !name || !password) {
      return res.status(422).json({ error: "Please add all the field" });
    }

    const isRepeatEmail = await User.findOne({ email });
    if (isRepeatEmail) {
      return res
        .status(422)
        .json({ error: "User already exists with that email" });
    } else {
      await User.create({
        email,
        password,
        name,
      });
      res.status(200).json({ message: "saved successfully" });
      return;
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
