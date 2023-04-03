module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    companyname: {
      type: String,
      required: true,
    },
    phoneno: { type: Number, required: true, unique: true },
  });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    console.log("this is object => ", object);
    return object;
  });

  const Emp = mongoose.model("emps", schema);
  return Emp;
};
