const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;

const { MONGOURI } = require("./keys");
app.use(express.json());

const authRouter = require("./routes/auth");
require("./models/user");

app.use(authRouter);

// Nob8WNmDZTeUwQRi
mongoose.connect(MONGOURI);
mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});

mongoose.connection.on("error", (error) => {
  console.error("error connecting", error);
});
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
