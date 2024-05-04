const Task = require("../model/todoModel");

let todoAddController = async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.send({ error: "Please Fill All Input" });
  }

  let existingTask = await Task.find({ name: name });

  if (existingTask.length > 0) {
    return res.send({ error: `This Task is already Pending` });
  } else {
    let task = new Task({
      name: name,
      description: description,
    });

    task.save();

    res.send({
      success: "Successfull Added to Your List",
      name: name,
      description: description,
    });
  }
};

module.exports = todoAddController;
