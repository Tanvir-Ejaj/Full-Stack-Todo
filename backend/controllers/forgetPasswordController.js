const User = require("../model/userModel");
const nodemailer = require("nodemailer");
var jwt = require("jsonwebtoken");

let forgetPasswordController = async (req, res) => {
  const { email } = req.body;

  let existingUser = await User.find({ email: email });

  if (existingUser.length > 0) {
    jwt.sign({ email: email }, "shhhhh", async function (err, token) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "tanvirejij@gmail.com",
          pass: "cjyl tktx lbtd pqlc",
        },
      });

      const info = await transporter.sendMail({
        from: '"Todo app👻"<tanvirejij@gmail.com>',
        to: email,
        subject: "Password Change Request",
        html: `<p>Please Change your password at this link: 
            <a href="http://localhost:5173/newpassword/${token}">${token}</a>
          </p>`,
      });
    });
    res.send({ success: "Email sent. Please Check your Email" });
  } else {
    res.send({ error: "User not found" });
  }
};

module.exports = forgetPasswordController;
