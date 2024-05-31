import { Router } from "express";
import {
  userController,
  userCreatePostController,
  userPostsController,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/:username").post(userController);
userRouter.route("/:username/posts").post(userPostsController);
userRouter.route("/:username/post/create").post(userCreatePostController);

export default userRouter;
