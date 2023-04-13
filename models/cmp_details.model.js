
module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    phoneno: { type: Number, unique: true, required: true },
    // companyname: { type: String, required: true },
    month: { type: String, required: true },
    amt: { type: Number, required: true },
});

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    console.log("this is object => ", object);
    return object;
  });

  const Cmp = mongoose.model("cmp_details", schema);
  return Cmp;
};
