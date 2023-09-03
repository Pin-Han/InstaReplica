"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const authController_1 = require("../controller/authController");
const authController = new authController_1.AuthController();
const router = express.Router();
router.post("/signup", authController.signup);
module.exports = router;
//# sourceMappingURL=userRoutes.js.map