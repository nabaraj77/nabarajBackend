const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema for User Sign Up
const ProjectSchmena = new Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  githubLink: {
    type: String,
    required: true,
  },
});
const Projects = mongoose.model("Projects", ProjectSchmena);
module.exports = Projects;
