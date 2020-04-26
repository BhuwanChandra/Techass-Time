const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const { HOST } = require("../config/keys");
const requireLogin = require("../middleware/requireLogin");
const generateToken = require("../middleware/generateToken");
const { MAIL_PASS } = require("../config/keys");
const nodeMailer = require("nodemailer");

const sendVerificationMail = (req, res, user) => {
  let transporter = nodeMailer.createTransport({
    host: "smtp.zoho.in",
    port: 465,
    secure: true,
    auth: {
      user: "bbs7779@bhuwan.codes",
      pass: MAIL_PASS
    }
  });

  generateToken(user).then(result => {
    let verifyUri = `${HOST}verifytoken/${result.userId}/${result.token}`;
    console.log(result);
    
    let mailTemplate = `
    <h4> Please verify your account by clicking on the link below: </h4>
    <a href="${verifyUri}">${verifyUri}</a><br/><br/>
    `;

    // setup email data with unicode symbols
    let mailOptions = {
      from: "bbs7779@bhuwan.codes", // sender address
      to: `${user.email}, ze3zt.bbs@inbox.testmail.app`, // list of receivers
      subject: "Please verify your Quizzz account!", // Subject line
      html: mailTemplate // html body
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error: `error in sending mail to ${user.email}, please check your email!` });
      } else {
        res.json({ message: `verification email sent to ${user.email}, please verify your email!` });
        console.log(info);
      }
    });
  })
  .catch(err => {
    res.status(400).json({ error: `error in sending mail to ${user.email}, please check your email!` });
    console.log(info);
  })
};



router.post("/signup", (req, res) => {
  const { name, email, password, } = req.body;
  if (!email || !name || !password) {
    return res.status(422).json({
      error: "please add all the fields."
    });
  }
  console.log(req.path)
  console.log(req.originalUrl)
  User.findOne({ email: email })
    .then(saveUser => {
      if (saveUser)
        return res.status(422).json({
          error: "Email already registered."
        });

      bcrypt
        .hash(password, 12)
        .then(hashPassword => {
          const user = new User({
            email,
            password: hashPassword,
            name,
          });
          user
            .save()
            .then(user => {
              sendVerificationMail(req, res, user);
              // res.json({ message: "verification email has been sent, please verify your email!" });
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(422).json({
      error: "please add all the fields."
    });

  User.findOne({ email: email })
    .then(savedUser => {
      if (!savedUser)
        return res.status(422).json({
          error: "Invalid Email or Password."
        });
      bcrypt
        .compare(password, savedUser.password)
        .then(doMatch => {
          if (doMatch) {
            const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
            const { _id, name, email, tests, isVerified} = savedUser;
            res.json({
              message: "Successfully signed in!!!",
              token,
              user: { _id, name, email, tests, isVerified}
            });
          } else {
            return res
              .status(422)
              .json({ error: "Invalid Email or Password." });
          }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

router.post("/sendverificationemail", requireLogin, (req, res) => {
  const { user } = req.body;
  sendVerificationMail(req, res, user);
});

module.exports = router;
