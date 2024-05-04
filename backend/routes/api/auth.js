const express = require("express");
const route = express.Router();
const secureApi = require("../../middleware/secureApi");
const registrationController = require("../../controllers/registratitonController");
const otpController = require("../../controllers/otpController");
const loginController = require("../../controllers/loginController");
const forgetPasswordController = require("../../controllers/forgetPasswordController");
const newPasswordController = require("../../controllers/newPasswordController");
// const resendOtpController = require("../../controllers/resendOtpController");

route.post("/registration", secureApi, registrationController);
route.post("/otpverification", otpController);
route.post("/login", loginController);
// route.post("/resendotp", resendOtpController);
route.post("/forgetpassword", forgetPasswordController);
route.post("/newpassword", newPasswordController);

module.exports = route;
