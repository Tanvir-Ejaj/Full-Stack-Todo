require("dotenv").config();
const express = require("express");
const router = require("./routes/index");
const mongoConfig = require("./config/mongoConfig");
var cors = require("cors");
const app = express();

mongoConfig();
app.use(cors());
app.use(express.json());
app.use("/", router);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("port runnig");
});
