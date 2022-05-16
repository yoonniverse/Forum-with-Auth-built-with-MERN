import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../model/userModel.js";

// @desc Create user
// @route POST /api/users
// @access Public
export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email: email });
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({
    name: name,
    email: email,
    password: hashedPassword,
  });
  await user.save();
  res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user.id),
  });
});

// @desc Update user
// @route PATCH /api/users
// @access Private
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  });
  res.status(200).json(user);
});

// @desc Delete user
// @route DELETE /api/users
// @access Private
export const deleteUser = asyncHandler(async (req, res) => {
  await User.findByIdAndRemove(req.user.id);
  res.status(200).json({ id: req.params.id });
});

// @desc Authenticate user
// @route POST /api/users/login
// @access Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("No matching email found.");
  }
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(400);
    throw new Error("Incorrect password.");
  }
  res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user.id),
  });
});

// @desc Get user data
// @route GET /api/users/me
// @access Private
export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
