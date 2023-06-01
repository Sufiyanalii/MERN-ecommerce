import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/auth.js";

///creating user
export const createUser = expressAsyncHandler(async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
  });
  const user = await newUser.save();

  res.send({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user),
  });
});

// /login

export const loginUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token1 = generateToken(user);
      res.cookie("token", token1, { maxAge: 24 * 60 * 60 * 1000 });
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: token1,
      });
      return;
    }
  }
  res.status(401).send({ message: "Invalid email or password" });
});

//get all users

export const getAllUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

//get one user by admin

export const getOneUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

//update user by admin

export const updateUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);
    const updatedUser = await user.save();
    res.send({ message: "User Updated", user: updatedUser });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

export const deleteUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.email === "admin@example.com") {
      res.status(400).send({ message: "Can Not Delete Admin User" });
      return;
    }
    await user.remove();
    res.send({ message: "User Deleted" });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

///UpdateProfile

export const updateProfile = expressAsyncHandler(async (req, res) => {
  console.log(req.user)
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 8);
    }

    const updatedUser = await user.save();
    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser),
    });
  } else {
    res.status(404).send({ message: 'User not found' });
  }
})

//logout User
export const logoutUser = expressAsyncHandler(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});
