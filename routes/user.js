const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares");

const userController = require("../controllers/users.js");

//Signup
router.route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup));

//Login
router.route("/login")
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), userController.login);

//LogOut
router.get("/logout", userController.logout);



module.exports = router;  