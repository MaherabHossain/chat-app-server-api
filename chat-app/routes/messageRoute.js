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
    const result = await Convertation.findByIdAndUpdate(conv_id, {
      last_message: message,
    });
    const msgRes = new Message({
      message,
      send: req.id,
      receive: req.body.id,
    });
    await msgRes.save();
    res.status(200).json({
      message: "message sent successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;
