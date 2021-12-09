const mongoose = require("mongoose");
const requestSchema = require("../../schemas/requestSchema");
const Request = mongoose.model("Request", requestSchema);
const userSchema = require("../../schemas/userSchema");
const User = mongoose.model("User", userSchema);
const seeAllRequest = async (req, res) => {
  try {
    const user = await Request.find({
      receive: req.id,
      status: false,
    })
      .select("send")
      .populate("send");

    res.status(200).json({
      user,
    });
  } catch {
    res.status(500).json({
      error: "server error",
    });
  }
};
module.exports = seeAllRequest;
