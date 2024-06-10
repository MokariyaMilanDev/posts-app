import { ApiResponse } from "../utils/CLASSES.js";
import { userModel } from "../models/user.model.js";
import { postModel } from "../models/post.model.js";
import jwt from "jsonwebtoken";

export const userController = async (req, res) => {
  console.log("||| /in/:username |||");

  const { username } = req.params;
  const accessToken = req.cookies.accessToken;

  const { _id } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  const user = await userModel.findOne({
    $and: [{ _id }, { username }],
  }).select("-password -createdAt -updatedAt -isLoggedIn -__v -_id")

  return res.json(new ApiResponse(true, null, "User", { user }));
};

export const userPostsController = async (req, res) => {
  console.log("||| /in/:username/posts |||");

  const username = req.params.username;

  const postsObject = await userModel.aggregate([
    {
      $match: {
        username,
      },
    },
    {
      $lookup: {
        from: "posts",
        localField: "_id",
        foreignField: "auther",
        as: "posts",
        pipeline: [
          {
            $lookup: {
              from: "users",
              foreignField: "_id",
              localField: "auther",
              as: "auther",
            },
          },
          {
            $addFields: {
              auther: {
                $first: "$auther.username",
              },
            },
          },
        ],
      },
    },
    {
      $project: {
        posts: "$posts",
      },
    },
  ]);

  const posts = postsObject[0].posts;

  if (!posts) {
    return res.json(new ApiResponse(false, 0, "Server error"));
  }

  return res.json(
    new ApiResponse(true, null, "Posts fetch successfully", { posts })
  );
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

  return res.json(new ApiResponse(true, null, "post created successfully"));
};
