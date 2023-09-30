const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema for User Sign Up
const UserSchmena = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
});
const Users = mongoose.model("Users", UserSchmena);
module.exports = Users;
