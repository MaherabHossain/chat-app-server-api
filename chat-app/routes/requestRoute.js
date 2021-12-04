const express = require("express");
const { TokenExpiredError } = require("jsonwebtoken");
const mongoose = require("mongoose");
const checkLogin = require("../middlewares/checkLogin");
const checkFriend = require("../middlewares/checkFriend");
const requestSchema = require("../schemas/requestSchema");
const convertationSchema = require("../schemas/convertationSchema");
const Request = mongoose.model("Request", requestSchema);
const Convertation = mongoose.model("Convertation", convertationSchema);
const router = express.Router();
// for test purpose i will remove it later
router.get("/", (req, res) => {
  res.json({
    message: "its working",
  });
});
// sending message request
router.post("/send", checkLogin, async (req, res) => {
  try {
    const request = new Request({
      send: req.id,
      receive: req.body.id,
    });
    await request.save();
    res.status(200).json({
      message: "friend request sent sucessfully",
    });
  } catch {
    res.status(500).json({
      error: "there was an server side error",
    });
  }
});
// see all user in the system
router.get("/see-all", checkLogin, async (req, res) => {
  try {
    const allData = await Request.find({ receive: req.id }).populate("send");
    res.status(200).json({
      status: "success",
      data: allData,
    });
  } catch {
    res.status(500).json({
      error: "server side error",
    });
  }
});
// accept message request
router.put("/accept/:id", checkLogin, async (req, res) => {
  try {
    const result = await Request.findOneAndUpdate(
      { send: req.params.id, receive: req.id },
      {
        $set: {
          status: true,
        },
      },
      {
        new: true,
      }
    );
    const convertation = new Convertation({
      participantOne: req.id,
      participantTwo: req.params.id,
      messages: [],
    });
    await convertation.save();
    res.status(200).json({
      message: "message request accept successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
// i will remove it later .its for test purpose
router.post("/check-friend", [checkLogin, checkFriend], (req, res) => {
  res.status(200).send({
    sender: req.sender,
    receiver: req.receiver,
  });
});
// testing. i will remove it later
router.post("/push-message", async (req, res) => {
  try {
    const convertation = new Convertation({
      participantOne: "61a7bc65da5e11eb876bbfde",
      participantTwo: "61a7bc65da5e11eb876bbfdf",
      messages: ["61a7bc65da5e11eb876bbfdf", "61a7bc65da5e11eb876bbfdf"],
    });
    await convertation.save();
    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
// testing i will remove it later
router.get("/all-message", async (req, res) => {
  const message = await Convertation.find();
  res.status(200).json({
    data: message,
  });
});
// i will remove it later -> push new message
router.get("/single-message", async (req, res) => {
  try {
    const result = await Convertation.findByIdAndUpdate(
      "61ab6c672c0c9a7ba5d719cd",
      {
        $push: {
          messages: "61a7bc65da5e11eb876bbfd0",
        },
      }
    );
    res.status(200).json({
      message: "message push",
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});
module.exports = router;
