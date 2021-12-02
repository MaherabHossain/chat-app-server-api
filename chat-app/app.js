const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const checkLogin = require("./middlewares/checkLogin");
const userRouter = require("./routes/userRoute");
const requestRoute = require("./routes/requestRoute");
const app = express();
dotenv.config();
app.use(express.json());

app.listen(4000, () => {
  console.log("app is listening on port 4000");
});
mongoose
  .connect("mongodb://localhost/chatapp")
  .then(() => console.log("successfullt connected to mongodb"))
  .catch((err) => console.log(e));

app.use("/user", userRouter);
app.use("/request", requestRoute);
app.get("/", (req, res) => {
  res.json({
    message: "i am working",
  });
});
app.get("/testing", checkLogin, (req, res) => {
  res.status(200).json({
    message: "woohoo",
  });
});
