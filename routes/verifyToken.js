const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Token = mongoose.model("Token");


router.get('/verifytoken/:uid/:token', (req, res) => {
  const token = req.params.token;
  const uid = req.params.uid;
  Token.findOne({userId: uid})
  .then(result => {
    if(result.token.toString() === token.toString()){
      User.findByIdAndUpdate(uid, {'$set': {'isVerified': true}})
      .then(user => {
        res.send(`<center><h2>your email ${user.email} is verified!</h2></center>`);
      })
      .catch(err => {
        console.log(err);
        res.send("<h4>Error: email not veried!! may be your token is expired</h4>");
      });
    }
  })
  .catch(err => {
    console.log(err.message);
    res.send("<h4>Error: email not veried!! may be your token is expired!</h4>");
  })
});

module.exports = router;
