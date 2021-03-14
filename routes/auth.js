const express = require("express");
const { check } = require("express-validator");
const { signup, signin, IsAuth, signout, finduser } = require("../controller/auth");
const router = express.Router();

router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("name should be atleast 3 character long"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("password should be atleast 5 character long"),
      check("address").isLength({min : 8}).withMessage("adddress should be 8 character long"),
      check('contact_no').isLength({min:10,max:10}).withMessage("contact number should be of 10 digits"),
      check("gender").isLength({min:1 ,max:1}).withMessage('gender should specified')
    // check("email").isEmail().withMessage("email should not be empty"),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("password")
      .isLength({ min: 5 })
      .withMessage("password should be atleast 5 character long"),
    check("email").isEmail().withMessage("email should not be empty"),
  ],
  signin
);

router.get('/isSignned' , IsAuth);
router.get('/signout' , signout);
router.get('/userprofile' , finduser);

module.exports = router;
