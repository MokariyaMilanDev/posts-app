import { ApiResponse } from "../utils/CLASSES.js";
import { userModel } from "../models/user.model.js";
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

  return res.json(
    new ApiResponse(true, null, "User successfuly authenticated", { username })
  );
};

export const userPostsController = async (req, res)=>{
  console.log("||| /in/:username/posts |||");

}
