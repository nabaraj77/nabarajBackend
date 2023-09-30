const Messages = require(`../Models/Message.model`);

var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const postMessages = async (req, res, next) => {
  const { email, name } = req.body;

  try {
    const existingUser = await Messages.findOne({ email });
    if (!existingUser) {
      const message = new Messages(req.body);
      const result = await message.save();
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD },
      });
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Response Received.",
        html: `Dear, <h3>${name}</h3> <h4> Thankyou for your response. This is an automated generated mail.</h4> <h3>Nabaraj Dahal</h3>`,
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(err);
        }
        console.log("Email sent Successfully.");
        res
          .status(201)
          .json({ message: "Message saved successfully.", info, result });
      });
    } else {
      try {
        const id = existingUser._id;
        const update = req.body;
        const options = { new: true };
        const results = await Messages.findByIdAndUpdate(id, update, options);
        console.log("Message Updated");
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD },
        });
        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Response Received.",
          html: `Dear, <h3>${name}</h3> <h4> Thankyou for your response. This is an automated generated mail.</h4> <h3>Nabaraj Dahal</h3>`,
        };
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.error(err);
          }
          console.log("Email sent Successfully.");
          res.status(201).json({ message: "Message saved successfully." });
        });
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const messages = await Messages.find({}, { __v: 0 });
    if (!messages || messages.length === 0) {
      return res.status(404).json({ message: "Messages not Found" });
    }
    return res.status(200).json({ message: messages });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getMessages = getMessages;
exports.postMessages = postMessages;
