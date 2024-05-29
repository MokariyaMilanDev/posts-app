import { Router } from "express";
import { userController, userPostsController } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/:username").post(userController);
userRouter.route("/:username/posts").post(userPostsController);

export default userRouter;