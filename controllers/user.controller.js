"Use strict";
const db = require("../models");
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv");
 const nodemailer = require("nodemailer");
const Image = db.image;
const fs = require("fs");

exports.get_user = (req, res) => {
  res.send("Success");
};

exports.registerUser = async (req, res) => {
  try {
    const userDetails =  { 
      fName: req.body.fName,
       lName: req.body.lName,
        email: req.body.email,
        password: req.body.password,
        image: req.file
      };
    if (!(userDetails)) {
      res.status(400).send("Please insert all the fileds");
    }
    const oldUser = await User.findOne({
      email: userDetails.email,
    }).lean();
    if (oldUser) {
      return res.status(400).send({
        success: false,
        message: "User Already Exist. Please Login",
      });
    } else {
      const token = jwt.sign(
        {
          data: userDetails.email.toString(),
        },
        process.env.JWT_TOKEN,
        {
          expiresIn: "1D",
        }
      );
      const encryptedPassword = await bcrypt.hash(userDetails.password, 10);
      const bitmapImage = fs.readFileSync(userDetails.image.path)
      const base64Image = Buffer(bitmapImage).toString("base64");
     
      const user = new User({
        fName: userDetails.fName,
        lName: userDetails.lName,
        email: userDetails.email.toString(),
        password: encryptedPassword,
        image: {
          data: base64Image,
          contentType: "image/jpg",
        }
      }).save().then(async (response)=> {
        const transpoter = await nodemailer.createTransport({
          host: process.env.HOST,
          port: 587,
          secure: false,
          auth: {
            user: process.env.USER, // generated ethereal user
            pass: process.env.PASSWORD, // generated ethereal password
          },
        });
  
        const info = await transpoter.sendMail({
          from: process.env.MAIL_SENDER_EMAIL, // sender address
          to: response.email, // list of receivers
          subject: "Hello", // Subject line
          text: "Hello ", // plain text body
          html: `<h1>Hello ${response.fName}</h1>
                      <a href="localhost:5000/user/verify-email/${response.id}">
                       <h3>verify your mail ${response.email}</h3>
                       </a`,
        });

        res.status(200).send({
          success: true,
          message: 'Registration successfully',
          response,
          token
        });
      })
      // res.send(info);
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(502).send({
        success: false,
        message: "user detail is required",
      });
    }
    const user = await User.findOne({
      email: email,
    }).lean();
    console.log("user", user.password);
    console.log("password", await bcrypt.hash(password, 10));
    if (user.isActive) {
      if (await bcrypt.compare(password,user.password)) {
          const token = jwt.sign(
            {
              user_id: user._id,
              email,
            },
            process.env.JWT_TOKEN,
            {
              expiresIn: "5D",
            }
          )
          await res.status(200).send({
            success: true,
            message: "login successful",
            token,
          });
      } else {
        res.status(500).send({
          success: false,
          message: "Invalid credentials",
        });
      }
    } else {
      res.send({
        message: "PLease verify your mail",
      });
    }
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

exports.verifyEmail = async (req, res) => {
  const id = req?.params?.id;

  User.findByIdAndUpdate(id, {
    $set: {
      isActive: true,
    },
  })
    .then((data) => {
      res.send("<h1> Thank You!</h1>");
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err.message,
      });
    });
};

exports.forgetPassword = async (req, res) => {
  try {
    const { email, newPasswoprd, password } = req.body;

    if (!(email && password && newPasswoprd)) {
      res.status(400).send("Please insert all the fileds");
    }
    const oldUser = await User.findOne({
      email: email,
    }).lean();
    const encryptedNewPassword = await bcrypt.hash(newPasswoprd, 10);
    if (email && oldUser.email && bcrypt.compare(password, oldUser.password)) {
      User.findByIdAndUpdate(
        oldUser._id,
        {
          password: encryptedNewPassword,
        },
        {
          new: true,
        }
      ).then((data) => {
        console.log("new data", data);
        res.status(200).send({
          success: true,
          message: "Password Update successfully",
        });
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Bad request",
      });
    }
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    const bitmap = fs.readFileSync(req.file.path)
    const base64Image = Buffer.from(bitmap).toString("base64");
    const image = new Image({
      name: req.body.name,
      image: {
        data: req.file.filename,
        contentType: "image/jpg",
      },
    })
      .save()
      .then((data) => {
        res.status(200).send({
          success: true,
          message: "File upload successfully",
          data: base64Image,
        });
      });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteAccount = async(req,res)=> {
  try{
    const userId = req.params.id;
    const user = await User.findByIdAndDelete({$eq: {_id: userId}}).then(async()=> {
    await  res.status(200).send({
        success: true,
        message: 'Account deleted successfully'
      });
    }).catch(err => {
      res.status(404).send({
        message: err.message
      });
    });
  } catch(err){
    res.status(500).send({
      message: err.message
    });
  }
};