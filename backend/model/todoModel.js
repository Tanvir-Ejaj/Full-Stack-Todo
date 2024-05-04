const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  description: String,
});

module.exports = mongoose.model("Task", userSchema);
