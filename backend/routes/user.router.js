import { Router } from "express";
import {
  userController,
  userCreatePostController,
  userPostController,
  userPostsController,
} from "../controllers/user.controller.js";
import { Authentication } from "../middlewares/Authentication.js";

const userRouter = Router();

userRouter.route("/:username").post(Authentication, userController);
userRouter.route("/:username/posts").post(userPostsController);
userRouter.route("/:username/posts/:_id").post(userPostController);
userRouter.route("/:username/post/create").post(userCreatePostController);

export default userRouter;
