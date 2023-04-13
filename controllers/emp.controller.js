const db = require("../models");
const Emp = db.emp;
const Cmp = db.cmp_details;

exports.get_data = (req, res) => {
  res.send("sucess");
};

exports.set_empdata = (req, res) => {
  console.log("req body",req.body);
  const { fname, lname, email, phoneno, companyname } = req.body;

  const emp_details = new Emp({
    fname: fname,
    lname: lname,
    email: email,
    phoneno: phoneno,
    companyname: companyname,
  });

  emp_details
    .save()
    .then((data) => {
      console.log("this is get data => ", data);
      res.status(200).send("success");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.set_cmpdata = (req, res) => {
  const { companyname, month, amt, phoneno } = req.body;

  const cmp_details = new Cmp({
    companyname: companyname,
    month: month,
    amt: amt,
    phoneno: phoneno,
  });

  cmp_details
    .save()
    .then((data) => {
      console.log("this is get data => ", data);
      res.status(200).send("success");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.set_alldata = (req, res) => {
  const { fname, lname, email, phoneno, companyname, month, amt } = req.body;

  const emp_details = new Emp({
    fname: fname,
    lname: lname,
    email: email,
    phoneno: phoneno,
    companyname: companyname,
  });

  const cmp_details = new Cmp({
    companyname: companyname,
    month: month,
    amt: amt,
    phoneno: phoneno,
  });

  emp_details
    .save()
    .then((data) => {
      cmp_details.save().catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
      console.log("this is get data => ", data);
      res.status(200).send("success");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.get_alldata = (req, res) => {
  Emp.aggregate([
    {
      $lookup: {
        from: "cmp_details",
        localField: "phoneno",
        foreignField: "phoneno",
        as: "CompanyDetails",
      },
    },
    {
      $unwind: "$CompanyDetails",
    },
  ])
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};
exports.getdataPhoneumber = (req, res) => {
  const { phoneno } = req.params;
  Emp.aggregate([
    { $match: { phoneno: { $eq: +phoneno } } },
    {
      $lookup: {
        from: "cmp_details",
        localField: "phoneno",
        foreignField: "phoneno",
        as: "CompanyDetails",
      },
    },
    {
      $unwind: "$CompanyDetails",
    },
  ])
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

exports.delete_emp = (req, res)=> {
  const fname = req.params.name;
  db.emp.deleteOne({fname}).then(() => res.send({ 
    message:'Record Delete Successfully',
    status: 'OK'
  }));

}
