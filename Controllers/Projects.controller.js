const Projects = require(`../Models/Projects.model`);

//USING NEXT MIDDLEWARE TO GET THE USER DETAILS THROUGH THE ID THAT HAS BEEN OBTAINED FROM verifyToken MIDDLEWARE
const getProjects = async (req, res, next) => {
  let projects;
  try {
    projects = await Projects.find({}, { __v: 0 });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
  if (!projects) {
    return res.status(404).json({ message: "Projects not Found" });
  }
  return res.status(200).json({ message: projects });
};

//POST MESSAGES
const postProjects = async (req, res, next) => {
  try {
    const projects = new Projects(req.body);
    const result = await projects.save();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};

const deleteProjects = async (req, res, next) => {
  const id = req.params.id;
  try {
    const results = await Projects.findByIdAndDelete(id);
    if (!results) {
      res.status(404).json({ message: "Product Does not exist." });
    }
    res.send("Deleted");
  } catch (err) {
    console.log(err);
  }
};
const updateProject = async (req, res, next) => {
  const id = req.params.id;
  try {
    const update = req.body;
    const options = { new: true };
    const results = await Projects.findByIdAndUpdate(id, update, options);
    if (!results) {
      res.status(404).json({ message: "Product Id does not exist." });
    }
    res.send("Updated");
  } catch (error) {
    console.log(error.message);
  }
};

exports.getProjects = getProjects;
exports.postProjects = postProjects;
exports.deleteProjects = deleteProjects;
exports.updateProject = updateProject;
