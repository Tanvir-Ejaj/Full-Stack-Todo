const User = require("../model/userModel");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

let registrationController = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.send({ error: "Please Fill All Input" });
  }

  if (password && password.length < 6) {
    return res.send({ error: "Password is too short" });
  }

  let existingUser = await User.find({ email: email });

  if (existingUser.length > 0) {
    return res.send({ error: "email already in use" });
  } else {

    
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });


    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tanvirejij@gmail.com",
        pass: "rcre rwdm dxyw gtlm",
      },
    });
    const info = await transporter.sendMail({
      from: '"RealTodo"<tanvirejij@gmail.com>',
      to: email,
      subject: "Verification",
      html: `<b>This is your verification code: ${otp}</b>`,
    });
    // async function main() {
    //   console.log("Message sent: %s", info.messageId);
    // }
    // main().catch(console.error);

    bcrypt.hash(password, 10, async function (err, hash) {
      let user = new User({
        name: name,
        email: email,
        password: hash,
        otp: otp,
      });
      user.save();

      res.send({
        success: "Registration Successfull. Please Check Your Email",
        name: user.name,
        email: user.email,
      });
    });
  }
};

module.exports = registrationController;

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "tanvirejij@gmail.com",
//     pass: "whxx ihcz khof rdxb",
//   },
//   logger: true, // Enable logging
//   debug: true, // Debug mode
// });

// const info = await transporter.sendMail({
//   from: '"Todo2"<tanvirejij@gmail.com>',
//   to: email,
//   subject: "Verification",
//   html: `<b>This is your verification code: ${otp}</b>`,
// });

// transporter.verify((error, success) => {
//   if (error) {
//     console.error("SMTP server connection error:", error);
//   } else {
//     console.log("SMTP server connection success:", success);
//   }
// });
