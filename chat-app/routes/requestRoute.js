const express = require("express");
const { TokenExpiredError } = require("jsonwebtoken");
const mongoose = require("mongoose");
const checkLogin = require("../middlewares/checkLogin");
const checkFriend = require("../middlewares/checkFriend");
const requestSchema = require("../schemas/requestSchema");
const convertationSchema = require("../schemas/convertationSchema");
const sendMessageRequest = require("../controller/Request/sendMessageRequest");
const seeAllUser = require("../controller/Request/seeAllUser");
const seeAllRequest = require("../controller/Request/seeAllRequest");
const seeAllFriendController = require("../controller/Request/seeAllFriendController");
const acceptMessageRequest = require("../controller/Request/acceptMessageRequest");
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
router.post("/send", checkLogin, sendMessageRequest);
// see all user in the system
router.get("/see-all", checkLogin, seeAllUser);
// see all message request
router.get("/all-request", checkLogin, seeAllRequest);
// accept message request
router.put("/accept/:id", checkLogin, acceptMessageRequest);
// see all friend
router.get("/see-all-friend", checkLogin, seeAllFriendController);
// i will remove it later .its for test purpose
router.post("/check-friend", [checkLogin, checkFriend], (req, res) => {
  res.status(200).send({
    sender: req.sender,
    receiver: req.receiver,
  });
});
// testing. i will remove it later
//now let's fuck
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
      "61ab8e14858645667c1b0f9a",
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
