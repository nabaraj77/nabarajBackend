// const nodemailer = require("nodemailer");
// //SENDIGN MAILS
// const sendMail = async (req, res, next) => {
//   const { email } = req.body;
//   console.log(email);
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD },
//     });
//     const mailOptions = {
//       from: process.env.EMAIL,
//       to: email,
//       subject: "Response Received.",

//       html: "<h4>This is an automated generated mail.</h4><h4>Your response has been received.</h4><h3>Nabaraj Dahal</h3>",
//     };
//     transporter.sendMail(mailOptions, (err, info) => {
//       if (err) {
//         console.log(err);
//       }
//       console.log("Email sent Successfully.");
//       res.status(201).json({ message: "Email sent successfully.", info });
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(201).json(err);
//   }
// };

// exports.sendMail = sendMail;
