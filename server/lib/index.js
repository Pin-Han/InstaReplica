"use strict";
const mongoose = require("mongoose");
const dotenv = require("dotenv");
process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    console.error(err);
    process.exit(1);
});
dotenv.config({ path: "./config.env" });
const app = require("./app");
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
mongoose
    .connect(DB, {
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("DB connection successful!"))
    .catch((error) => {
    console.log("error", error);
});
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
process.on("unhandledRejection", (err) => {
    console.error("UNHANDLED REJECTION! 💥 Shutting down...");
    console.error(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
//# sourceMappingURL=index.js.map