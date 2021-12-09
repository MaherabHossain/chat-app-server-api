const mongoose = require("mongoose");
const userSchema = require("../../schemas/userSchema");
const User = mongoose.model("User", userSchema);
const requestSchema = require("../../schemas/requestSchema");
const Request = mongoose.model("Request", requestSchema);

const seeAllFriendController = async (req, res) => {
  try {
    const send = await Request.find({ send: req.id, status: true });
    const receive = await Request.find({ receive: req.id, status: true });
    const allFriend = send.concat(receive);
    const friend = [];
    const length = allFriend.length;
    console.log("length" + length);
    if (length === 0) {
      res.status(200).json({
        total_friend: length,
      });
    }
    allFriend.forEach(async (item, index) => {
      if (item.send.toString() === req.id) {
        console.log("send");
        const user = await User.findOne({ _id: item.receive });
        friend.push(user);
      } else if (item.receive.toString() === req.id) {
        console.log("receive");
        const user = await User.findOne({ _id: item.send });
        friend.push(user);
      }
      if (index === length - 1) {
        res.status(200).json({
          total_friend: length,
          user: friend,
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = seeAllFriendController;
