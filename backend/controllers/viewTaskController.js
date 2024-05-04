const Task = require("../model/todoModel");

let viewAllTaskController = async (req, res) => {
  let data = await Task.find();
  res.send(data);
};

module.exports = viewAllTaskController;