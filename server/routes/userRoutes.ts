const express = require("express");

import { AuthController } from "../controller/authController";
const authController = new AuthController();

const router = express.Router();

router.post("/signup", authController.signup);

module.exports = router;
