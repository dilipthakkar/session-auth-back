const { validationResult } = require("express-validator");
const User = require("../models/user");

exports.signup = (req, res) => {
  console.log(req.body);
  const error = validationResult(req).array();
  if (error.length > 0) {
    return res.status(400).json({ error: error[0].msg });
  }
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    return res.status(200).json({ success: "user added successfully" });
  });
};

exports.signin = (req, res) => {
  const error = validationResult(req);
  if (error.length > 0) {
    return res.status(400).json({ error: error.array()[0].msg });
  }

  const { email, password } = req.body;
  User.findOne({ email }).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        auth: false,
        error: "error in finding user",
      });
    }
    if (user && user.IsAuth(password)) {
      req.session.user = user._id;
      return res.status(200).json({
        user: req.session.user,
        success: "user found succesfully",
      });
    }
    return res.status(400).json({ auth: false, error: "password incorrect" });
  });
};

exports.IsAuth = (req, res) => {
  
  if (req.session.user) {
    return res.status(200).json({
      auth: true,
      user: req.session.user,
    });
  }
  return res.status(200).json({
    auth: false,
    message: "session expires",
  });
};

exports.signout = (req, res) => {
  req.session.destroy();
  res.status(200).json({
    auth: false,
    success: "session deleted",
  });
};

exports.finduser = (req,res)=>{
  const id = req.session.user ;
  if(!id) return res.status(400).json({error : "user session expires"});
  User.findOne({_id : id}).exec((err , user)=>{
    if(err){
      return res.status(400).json({error : err});
    }
    user.salt = undefined;
    user.encrypassword = undefined;
    return res.status(200).json({user : user});
  });


}
