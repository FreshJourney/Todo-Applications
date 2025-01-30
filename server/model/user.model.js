const mongoose = require("mongoose");
const { string } = require("zod");

const UserSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    unique: true,
    required: true,
  },
  Password: {
    type: String,
    required: true,
    select: false,
  },
  token: {
    type: String,
  },
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
