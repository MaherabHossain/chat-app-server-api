const mongoose = require("mongoose");
const router = require("../routes/userRoute");

const requestSchema = mongoose.Schema({
  send: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "User",
  },
  receive: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "User",
  },
  status: {
    type: Boolean,
    default: false,
  },
});

module.exports = requestSchema;
