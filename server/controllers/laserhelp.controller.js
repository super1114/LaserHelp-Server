const User = require("../models/user.model.js");

exports.signUp = (req, res) => {
  console.log(req.body);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  User.signUp(req.body, function (err, result) {
    if(result.length==0) return res.json({status:false});
    else return res.json({status:true});
  });
  // return res.json({aaa:"S"});
}

exports.logIn = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  User.logIn(req.body, function (err, result) {
    if(result.length==0) return res.json({status:false});
    else return res.json({status:true});
  });
  //return res.json({aaa:"L"});
}
