const User = require("../model/userModel");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

let resendOtpController = async (req, res) => {
  const { email } = req.body;

  let existingUser = await User.find({ email: email });

  if (existingUser.length > 0) {
    let newotp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    User.findOneAndUpdate({ otp: newotp });

    console.log(newotp);

    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: "tanvirejij@gmail.com",
    //     pass: "rcre rwdm dxyw gtlm",
    //   },
    // });

    // const info = await transporter.sendMail({
    //   from: '"RealTodo"<tanvirejij@gmail.com>',
    //   to: email,
    //   subject: "Verification",
    //   html: `<b>This is your verification code: ${Updatedotp}</b>`,
    // });

    res.send({ success: "Email sent. Please Check your Email" });
  } else {
    res.send({ error: "User not found" });
  }
};

module.exports = resendOtpController;
