const express = require("express");
const router = require("express-promise-router")();
const passport = require("passport");
const passportservice = require("../services/passport");
const validation = require("../validation/registerationValidator");
const AccountController = require("../controllers/userController");
const passportSignIn = passport.authenticate("local", { session: false });

router
  .route("/signup")
  .post(validation.validateRegisterationInput, AccountController.signUp);

router.route("/signin").post(passportSignIn, AccountController.signIn);

module.exports = router;
