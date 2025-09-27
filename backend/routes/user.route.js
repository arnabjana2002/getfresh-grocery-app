import { Router } from "express";
import {
  isAuth,
  login,
  logout,
  register,
} from "../controllers/user.controller.js";
import authUser from "../middlewares/auth.middleware.js";

const userRouter = new Router();

// Routes
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/is-auth", authUser, isAuth);
userRouter.get("/logout", authUser, logout);

export default userRouter;
