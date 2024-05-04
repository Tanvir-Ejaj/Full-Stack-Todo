const express = require("express");
const route = express.Router();
const registration = require("./auth");
const todo = require("./todo");

route.use("/auth", registration);
route.use("/todo", todo);

module.exports = route;
