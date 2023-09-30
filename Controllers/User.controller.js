const Users = require(`../Models/User.model`);

var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//SIGNUP FUNCTIONALITY
const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password);
  const user = new Users({
    name,
    email,
    password: hashedPassword,
  });
  try {
    await user.save();
    res.send("Saved");
  } catch (err) {
    console.log(err);
  }
};

// LOGIN FUNCTIONALITY
const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await Users.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found. Please SignUp" });
    }
  } catch (err) {
    console.log(err);
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid Email / Password" });
  }
  const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "35s",
  });
  if (req.cookies[`${existingUser._id}`]) {
    req.cookies[`${existingUser._id}`] = "";
  }

  res.cookie(String(existingUser._id), token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 35),
    httpOnly: true,
    sameSite: "lax",
  });

  return res.status(200).json({ message: "Successfully Logged In", token });
};

//VERIFICATION OF JWT TOKEN BY USING verifyToken MIDDLEWARE
const verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  try {
    const token = cookies ? cookies.split("=")[1] : null;
    if (!token) {
      return res.status(404).json({ message: "No token found1" });
    }

    //Else verify token
    jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(400).json({ message: "Invalid Token" });
      }

      req.id = user.id; //Passing the obtained user id to req.id for getUser middleware
    });
    next();
  } catch (err) {
    return res.status(404).json({ message: "No token found" });
  }
};

//USING NEXT MIDDLEWARE TO GET THE USER DETAILS THROUGH THE ID THAT HAS BEEN OBTAINED FROM verifyToken MIDDLEWARE
const getUser = async (req, res, next) => {
  const userId = req.id;
  let user;
  try {
    user = await Users.findById(userId, "-password");
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
  if (!user) {
    return res.status(404).json({ message: "User not Found" });
  }
  return res.status(200).json({ message: user });
};

//USER LOGOUT
const logout = (req, res, next) => {
  const cookies = req.headers.cookie;
  try {
    if (cookies) {
      res.clearCookie(`${req.id}`);
      res.status(200).json({ message: "User Logout" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
exports.logout = logout;
