const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const { MONGOBD_URL } = require("./config");

mongoose.set("strictQuery", true);
mongoose.connect(MONGOBD_URL);
mongoose.connection.on("connected", () => {
  console.log("Data base connected");
});

mongoose.connection.on("error", (error) => {
  console.log("DataBase Not connected");
});

app.use(cors());
app.use(express.json(), cors());
require("./models/user_model");
app.use(require("./routes/user_route"), cors());

app.listen(4000, () => {
  console.log("Terminal started");
});
