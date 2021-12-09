const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  message: {
    type: String,
    require: true,
  },
  send: {
    type: mongoose.Types.ObjectId,
    require: true,
  },
  receive: {
    type: mongoose.Types.ObjectId,
    require: true,
  },
  data: {
    type: Date,
    default: Date.now(),
  },
  seen: {
    type: Boolean,
    default: false,
  },
});

module.exports = messageSchema;
