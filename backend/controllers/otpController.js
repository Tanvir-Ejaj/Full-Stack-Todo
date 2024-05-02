const User = require("../model/userModel");

let otpController = async (req, res) => {
  const { email, otp } = req.body;
  let findUser = await User.findOne({ email: email });

  findUser.emailVerified; //fasle

  if (!findUser.emailVerified && findUser.otp == otp) {
    await User.findOneAndUpdate(
      { email: email },
      { otp: "", emailVerified: true }
    );
    res.send({ success: "OTP Verified" });
  } else {
    res.send({ error: "OTP Not Match" });
  }
};

module.exports = otpController;
