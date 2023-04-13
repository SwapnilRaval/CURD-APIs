'use strict'
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fName: { type: String, default: null },
  lName: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  isActive: { type : Boolean, default: false},
  image: {
    data: Buffer,
    contentType: String
  }
});

userSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
module.exports = mongoose.model("users", userSchema);