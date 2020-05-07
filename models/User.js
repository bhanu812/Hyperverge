const mongoose = require("mongoose")
const crypto = require("crypto")
var uniqid = require("uniqid")
var timestamps = require("mongoose-timestamp")
//var autoIncrement = require("mongodb-autoincrement");

var userSchema = new mongoose.Schema({
  id: {
    type: String,
    default: "usr" + uniqid()
  },
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32
  },
  email: {
    type: String,
    trim: true,
    unique: true
  },
  phone: {
    type: String,
    unique: true,
    trim: true
  },
  gender: {
    type: String,
    enum: ["male", "female"]
  },
  age: {
    type: Number,
    trim: true
  },
})

userSchema.plugin(timestamps)
module.exports = mongoose.model("User", userSchema)