const mongoose = require("mongoose");

let mongoConfig = () => {
  mongoose
    .connect(
      "mongodb+srv://TanvirEjajTushar:Tanvir_Ejaj_Tushar@tushar.fkrdtvz.mongodb.net/RealTodo?retryWrites=true&w=majority&appName=Tushar"
    )
    .then(() => console.log("Database Connected!"));
};

module.exports = mongoConfig;
