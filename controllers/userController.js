const { db } = require("../utils/database");
const { User } = require("../models/userSchema.js");
// const { authenticateToken } = require("./jwt");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { Password } = require("../models/resetPasswordSchema.js");
const { sendMail } = require("../utils/sendMail");

module.exports.register = (db) => {
  return async (req, res) => {
        const result = await User.findOne({ email: req.body.email });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt)
        if (result) {
          return res.status(401).json({
            message: "Email already registered",
            status: "failed",
          });
        }

        try {
          const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            tel: req.body.tel,
            country: req.body.country,
            password: hashedPassword,
            userName: req.body.userName,
            NID: req.body.NID,
          });
          const token = user.generateAuthToken()
          await user.save();
          sendMail(req)
          res.cookie('token',token,{
            httpOnly: true,
            secure: true,
            sameSite: 'none'
          });
          res.status(200).json({
            message:"User registered successfully",
            status:'success',
          });
        } catch (error) {
          res.status(401).json({
            message: error.message,
            status: "failed",
          });
        };
  };
};

module.exports.login = (db) => {
  return async(req, res) => {
   const  user = await User.findOne({
       email: req.body.email
    }).exec();
      console.log('WE are building login')
      console.log(user)
      // if (!user) {
      //   return res.status(400).json({ 
      //     message: "User not found" ,
      //     status: "failed"
      //   });
      // }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
     return  res.status(400).send({ message: "Invalid password" });
    } else {
      const token = user.generateAuthToken();
      res.status(200).json({
        success: true,
        message: "Log in successfull",
        data: user,
        token: token,
      });
    }
  };
};

module.exports.resetPassword = () => {
  return () => {
    this.resetPasswordToken = crypto.randomBytes(20).toString("hex");
    this.expireTime = Date.now() + 3600000;
  };
};

module.exports.recover = (db) => {
  return async (req, res) => {
    const user = await User.findOne({
      email: req.body.email,
    });
    const userDetails = new Password({
      email: user.email,
      User_id: user._id,
      resetPasswordToken: crypto.randomBytes(20).toString("hex"),
      expireTime: Date.now() + 3600000,
    });
    let link = `http://localhost:4000/password/reset`;
    let testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    const mailOptions = {
      to: user.email,
      from: "umugwanezaalice22@gmail.com",
      subject: "password reset request",
      text: `hi ${user.firstName} \n follow the link ${link}`,
    };
    if (!user) {
      res.status(400).json({ message: "user not found" });
    }
    await userDetails.save();

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      }
      console.log("sent" + info.response);
      res.send("email sent successfully");
    });
  };
};
