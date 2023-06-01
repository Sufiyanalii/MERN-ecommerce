import express from "express";
import { isAuth, isAdmin  } from "../middlewares/auth.js";

import {
  loginUser,
  createUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  logoutUser,
  updateProfile,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/signup", createUser);
userRouter.put("/profile", isAuth, updateProfile);
userRouter.get("/logout", logoutUser);
userRouter.get("/", isAuth, isAdmin, getAllUsers);
userRouter.get("/:id", isAuth, isAdmin, getOneUser);
userRouter.put("/:id", isAuth, isAdmin, updateUser);
userRouter.delete("/:id", isAuth, isAdmin, deleteUser);

export default userRouter;
