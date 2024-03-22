const asyncHandler = require("express-async-handler");
const Register = require("../models/registerModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getRegister = asyncHandler(async (req, res) => {
  const register = await Register.find();
  res
    .status(200)
    .json({ data: register, message: "You have accessed the user" });
});

const createRegister = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  if (!password || !email) {
    res.status(400);
    throw new Error("Please enter all fields");
  }
  const userAvailable = await Register.findOne({ email });

  if (userAvailable) {
    res.status(400);
    throw new Error("User Already exists");
  }
  //   hash password
  const hashPassword = await bcrypt.hash(password, 10);
  const register = await Register.create({
    email,
    password: hashPassword,
  });
  res.status(201).json({ user: register, message: "user created" });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const user = await Register.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          email: user.email,
          password: user.password,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );

    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password is not valid");
  }
});

const dashBoardData = asyncHandler(async (req, res) => {
  res.status(200).json({ body: req.user, message: "user accessed dashboard" });
});

module.exports = { getRegister, createRegister, loginUser, dashBoardData };
