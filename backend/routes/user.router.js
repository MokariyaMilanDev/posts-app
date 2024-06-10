import { Router } from "express";
import {
  userController,
  userCreatePostController,
  userPostsController,
} from "../controllers/user.controller.js";
import { Authentication } from "../middlewares/Authentication.js";

const userRouter = Router();

userRouter.route("/:username").post(Authentication, userController);
userRouter.route("/:username/posts").post(userPostsController);
userRouter.route("/:username/post/create").post(userCreatePostController);

export default userRouter;
