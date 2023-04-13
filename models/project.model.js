const mongoose = require("mongoose");

var schema = mongoose.Schema({
  projectName: { type: "string", unique: true, required: true },
  amt: { type: Number, required: true },
  projectType: { type: "string", required: true },
  month: { type: "string", required: true },
  projectTopic: { type: "string", required: true },
});

schema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("projects", schema);
