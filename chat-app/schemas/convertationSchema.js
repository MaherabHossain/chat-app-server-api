const mongoose = require("mongoose");

const convertationSchema = mongoose.Schema({
  participantOne: {
    type: mongoose.Types.ObjectId,
    require: true,
  },
  participantTwo: {
    type: mongoose.Types.ObjectId,
    require: true,
  },
  messages: {
    type: [mongoose.Types.ObjectId],
  },
});

module.exports = convertationSchema;
