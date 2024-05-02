const User = require("../model/userModel");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let newPasswordController = (req, res) => {
  const { password, token } = req.body;
  var decoded = jwt.verify(token, "shhhhh");

  bcrypt.hash(password, 10, async function (err, hash) {
    await User.findOneAndUpdate({ email: decoded.email }, { password: hash });
    res.send({ success: "Password Changed" });
  });
};

module.exports = newPasswordController;
