const mongoose = require("mongoose");
const userSchema = require("../../schemas/userSchema");
const User = mongoose.model("User", userSchema);
const seeAllUser = async (req, res) => {
  try {
    const allData = await User.find({});
    res.status(200).json({
      status: "success",
      data: allData,
    });
  } catch {
    res.status(500).json({
      error: "server side error",
    });
  }
};

module.exports = seeAllUser;
