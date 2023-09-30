const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());

const dotenv = require("dotenv").config();
const cors = require("cors");
app.use(cookieParser());

//CONNECTING TO MONGODB calling the function
require("./initDB")();

//CORS
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

//User Authentication login sign and JWT Verification Section
const UserRoute = require("./Routes/User.route");
app.use("/api", UserRoute);

//Message Route
const MessageRoute = require("./Routes/Message.route");
app.use("/api", MessageRoute);

//Projects Route
const ProjectRoute = require("./Routes/Project.route");
app.use("/api", ProjectRoute);

// //SENDING MESSAGE IN GMAIL
// const MessageSendingRoute = require("./Routes/MessageSender.route");
// app.use("/api", MessageSendingRoute);

//Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started at port${PORT}`);
});
