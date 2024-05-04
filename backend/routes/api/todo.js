const express = require("express");
const route = express.Router();
const todoAddController = require("../../controllers/todoAddController");
const viewAllTaskController = require("../../controllers/viewTaskController");

route.post("/addtask", todoAddController);


route.get("/viewalltask", viewAllTaskController);

module.exports = route;
