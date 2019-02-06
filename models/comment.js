const mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
  name: String,
  email: String,
  body: String, 
  post: String,
});

module.exports = mongoose.model("Comment", commentSchema);
