const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Question = mongoose.model("Question");
const requireLogin = require("../middleware/requireLogin");

router.get("/getquestions", requireLogin, (req, res) => {
  console.log(req.query.level);
  // const questions = require(`../questions/${req.query.level}`);
  Question.find({ level: req.query.level })
    .then(questions => {
      if (questions) res.status(200).json({ questions });
      else res.json({ error: "No questions available for the test." });
    })
    .catch(err => console.log(err));
  // res.status(200).json({ questions });
});

router.post('/saverecord', requireLogin, (req, res) => {
  const { result, level } = req.body;
  console.log(result, level);
  User.findOne({'_id': req.user._id})
  .select('-password')
  .then(response => {
    if (!response.isVerified) {
      return res.status(401).json({
        error: `Please verify your email to save your Quiz record.`
      });
    }
    console.log(response);
    let cnt = 0;
    if(response.tests.length > 0)
    response.tests.map((el,i) => {
      if(el.level && (el.level === level)){
        response.tests[i].result = result;
        cnt++;
      }
    });
    if(cnt !== 1){
      response.tests.push({result, level});
    }
    User.findByIdAndUpdate(req.user._id,{'$set': {
      'tests': [...response.tests]
    }},{new: true})
    .select('-password')
    .then(user => {
      console.log(user);
      return res.json(user);
    })
    .catch(err => res.status(422).json({err: err.message}));
  })
  .catch(err => res.status(420).json({err: err.message}));
})

// router.get("/setquestions", (req, res) => {
//     // const ques = req.body.questions;
//     const ques = require('../questions/hard');
//     if(ques.length < 5)
//     return res.json({ error: "test should have atleast 5 questions!" });
//     ques.forEach(el => {
//         const question = new Question(el);
//         question
//             .save()
//             .then(question => console.log(question.level))
//             .catch(err => console.log(err));
//     });
//     res.json({message: "questions recieved!!!"})
// });

module.exports = router;