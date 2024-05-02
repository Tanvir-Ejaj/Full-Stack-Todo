const User = require("../model/userModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");

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
    return res.send({ response: `${email} already in use` });
  } else {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tanvirejij@gmail.com",
        pass: "cjyl tktx lbtd pqlc",
      },
    });

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const info = await transporter.sendMail({
      from: '"Todo app👻"<tanvirejij@gmail.com>',
      to: email,
      subject: "Verification",
      html: `<b>This is your verification code :</b>${otp}`,
    });

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
        name: name,
        email: email,
      });
    });
  }
};

module.exports = registrationController;
