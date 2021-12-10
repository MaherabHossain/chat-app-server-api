const express = require("express");
const mongoose = require("mongoose");
const checkLogin = require("../middlewares/checkLogin");
const checkFriend = require("../middlewares/checkFriend");
const messageSchema = require("../schemas/messageSchema");
const Message = mongoose.model("Message", messageSchema);
const convertationSchema = require("../schemas/convertationSchema");
const Convertation = mongoose.model("Convertation", convertationSchema);
const router = express.Router();

router.post("/send", [checkLogin, checkFriend], async (req, res) => {
  try {
    const id = req.body.id;
    const message = req.body.message;
    const conv_id = req.body.conv_id;
    const messageReq = new Message({
      send: req.id,
      receive: id,
      message,
    });

    await messageReq.save();
    await Convertation.findOneAndUpdate(
      { _id: conv_id },
      {
        $set: {
          lastMessage: message,
        },
        $push: {
          messages: messageReq.id,
        },
      }
    );
    res.status(200).json({
      message: "successs",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;
