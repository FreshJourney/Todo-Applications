const express = require("express");
const app = express();
const PORT = process.env.PORT || 4001;
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const DB_URI = process.env.MONGODB_URI;
const todoRoute = require("./routes/todo.route");
const RouteUser = require("./routes/user.route");
const cors = require("cors");
const cookieParser = require("cookie-parser");
//const { rateLimiterUsingThirdParty } = require("./middleware/rateLimiter");

app.use(express.json());
//app.use("/todo", rateLimiterUsingThirdParty);
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["content-type", "authorization"],
  })
);
app.use("/todo", todoRoute);
app.use("/user", RouteUser);
try {
  mongoose.connect(DB_URI);
  console.log("Mongodb connected successfully");
} catch (error) {
  console.log(error);
}
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
