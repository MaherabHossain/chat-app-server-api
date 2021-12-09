const mongoose = require("mongoose");

const convertationSchema = mongoose.Schema({
  participantOne: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    require: true,
  },
  participantTwo: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    require: true,
  },
  messages: {
    type: [mongoose.Types.ObjectId],
  },
  lastMessage: {
    type: String,
    default: "",
  },
});

module.exports = convertationSchema;
