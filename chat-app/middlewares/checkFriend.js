const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const requestSchema = require("../schemas/requestSchema");
const Request = mongoose.model("Request", requestSchema);

const checkFriend = async (req, res, next) => {
  try {
    const sender = await Request.find({
      send: req.id,
      receive: req.body.id,
      status: true,
    });
    const receiver = await Request.find({
      send: req.body.id,
      receive: req.id,
      status: true,
    });
    console.log(req.id);
    // console.log(sender);
    console.log(receiver);
    (req.sender = sender), (req.receiver = receiver);
    if (sender.length > 0 || receiver.length > 0) {
      next();
    } else {
      res.status(200).json({
        message: "you are not friend",
      });
    }
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

module.exports = checkFriend;
