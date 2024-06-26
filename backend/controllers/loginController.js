const User = require("../model/userModel");
const bcrypt = require("bcrypt");

let loginController = async (req, res) => {
  const { email, password } = req.body;
  let findUser = await User.findOne({ email: email });

  if (findUser) {
    if (findUser.emailVerified == true) {
      bcrypt.compare(password, findUser.password, function (err, result) {
        if (result == true) {
          res.send({ success: "login successful" });
        } else {
          res.send({ error: "Crendential Not Match" });
        }
      });
    } else {
      res.send({ error: "Please Verify Your Account" });
    }
  } else {
    res.send({ error: "user not found" });
  }

  // if (findUser || findUser.emailVerified == true) {
  //   bcrypt.compare(password, findUser.password, function (err, result) {
  //     if (result == true) {
  //       res.send({ success: "login successful" });
  //     } else {
  //       res.send({ error: "Crendential Not Match" });
  //     }
  //   });
  // } else {
  //   res.send({ error: "user not found" });
  // }
};

module.exports = loginController;

// Main code
//   if (findUser) {
//     bcrypt.compare(password, findUser.password, function (err, result) {
//       if (result == true) {
//         res.send({ success: "login successful" });
//       } else {
//         res.send({ error: "Crendential Not Match" });
//       }
//     });
//   } else {
//     res.send({ error: "user not found" });
//   }
