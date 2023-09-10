const express = require("express");
const router = express.Router();

const authController = require("../controller/authController");
const postController = require("../controller/postController");

router.use(authController.protect);

router.route("/").get(postController.getPost).post(postController.createPost);

module.exports = router;
