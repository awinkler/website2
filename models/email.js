const mongoose = require("mongoose");

var emailSchema = new mongoose.Schema({
  address: String,
});

module.exports = mongoose.model("Email", emailSchema);
