const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  passwordHash: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
