const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema for User Sign Up
const MessageSchmena = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  message: [
    {
      type: String,
      required: true,
    },
  ],
  MessageDate: {
    type: Date,
    default: Date.now,
  },
});
const Messages = mongoose.model("Messages", MessageSchmena);
module.exports = Messages;
