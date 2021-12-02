const express = require("express");
const { TokenExpiredError } = require("jsonwebtoken");
const mongoose = require("mongoose");
const checkLogin = require("../middlewares/checkLogin");
const requestSchema = require("../schemas/requestSchema");
const Request = mongoose.model("Request", requestSchema);
const router = express.Router();
router.get("/", (req, res) => {
  res.json({
    message: "its working",
  });
});
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
    console.log(result);
    res.status(200).json({
      message: "message request accept successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
module.exports = router;
