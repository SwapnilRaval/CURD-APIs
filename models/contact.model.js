"use strict";
const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: { type: String },
  contact_no: {type: Array},
  address: { type: String },
  zip: { type: String },
});

schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  module.exports = mongoose.model("contacts",schema)