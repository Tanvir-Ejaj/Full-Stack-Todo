const express = require("express");
const route = express.Router();
const registration = require("./auth")

route.use("/auth", registration)

module.exports = route;
