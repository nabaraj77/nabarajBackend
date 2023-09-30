const mongoose = require("mongoose");
module.exports = () => {
  mongoose
    .connect(process.env.MongoDB_URL, {
      dbName: process.env.DB_NAME,
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Mongoose connected to Database...");
    })
    .catch((err) => {
      console.log(err.message);
    });
};
