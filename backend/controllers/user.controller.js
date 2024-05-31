import { ApiResponse } from "../utils/CLASSES.js";
import { userModel } from "../models/user.model.js";
import { postModel } from "../models/post.model.js";
import jwt from "jsonwebtoken";

export const userController = async (req, res) => {
  console.log("||| /in/:username |||");

  const { username } = req.params;
  const accessToken = req.cookies.accessToken;
  if (!accessToken)
    return res.json(new ApiResponse(false, "Access token is not found"));

  const { _id } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  const isExistUser = await userModel.findOne({
    $and: [{ _id }, { username }],
  });
  if (!isExistUser) return res.json(new ApiResponse(false, "Unvalid user"));

  return res.json(new ApiResponse(true, null, "User", { username }));
};

export const userPostsController = async (req, res) => {
  console.log("||| /in/:username/posts |||");
};

export const userCreatePostController = async (req, res) => {
  console.log("||| /in/:username/post/create |||");

  const { title, description } = req.body;
  if (!title) return res.json(new ApiResponse(false, 1, "Title is required"));

  if (!description)
    return res.json(new ApiResponse(false, 2, "Description is required"));

  const accessToken = req.cookies.accessToken;
  if (!accessToken)
    return res.json(
      new ApiResponse(true, 0, "Unauthorized request (missing accessToken)")
    );

  const { _id } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  if (!_id)
    return res.json(
      new ApiResponse(false, 0, "Unauthorized request (missing _id)")
    );

  const createdPost = await postModel.create({
    title,
    description,
    auther: _id,
  });
  if (!createdPost) return res.json(new ApiResponse(false, 0, "Server error"));

  return res.json(
    new ApiResponse(true, null, "post created successfully")
  );
};
