import { userModel } from "../models/user.model.js";
import { ApiResponse } from "../utils/CLASSES.js";
import jwt from "jsonwebtoken";

export const registerUserController = async (req, res) => {
  console.log("||| /auth/register |||");

  const { username, gmail, phone, password, confirmPassword } = req.body;

  if (
    !username?.trim() ||
    !gmail?.trim() ||
    !phone.toString()?.trim() ||
    !password?.trim() ||
    !confirmPassword?.trim()
  ) {
    return res.json(new ApiResponse(false, 0, "All fields are required"));
  }

  if (username.length <= 2 || username.length >= 12) {
    return res.json(
      new ApiResponse(false, 1, "Username must be between 2-12 letters")
    );
  }

  if (!gmail.includes("@") || !gmail.includes(".")) {
    return res.json(new ApiResponse(false, 2, "Unvalid gmail"));
  }

  if (phone.toString().length < 10 || phone.toString().length >= 11) {
    return res.json(new ApiResponse(false, 3, "Unvalid phone number"));
  }

  if (password !== confirmPassword) {
    return res.json(
      new ApiResponse(false, 4, "Both passwords are must be same")
    );
  }

  const isExistUser = await userModel.findOne({ username });
  if (isExistUser)
    return res.json(new ApiResponse(false, 1, "Username already exist"));

  const isExistGmail = await userModel.findOne({ gmail });
  if (isExistGmail)
    return res.json(new ApiResponse(false, 2, "User gmail already exist", {}));

  var createdUser = await userModel.create({
    username,
    gmail,
    phone,
    password,
  });

  if (!createdUser) return res.json(new ApiResponse(false, 0, "Server error"));

  return res
    .status(200)
    .json(new ApiResponse(true, "User created successfuly"));
};

export const loginUserController = async (req, res) => {
  console.log("||| /auth/login |||");

  const { gmail, password } = req.body;

  if (!gmail?.trim() || !password?.trim()) {
    return res.json(new ApiResponse(false, 0, "All fields are required"));
  }

  const isExistUser = await userModel.findOneAndUpdate(
    { gmail },
    { isLoggedIn: true }
  );
  if (!isExistUser) return res.json(new ApiResponse(false, 1, "Unvalid gmail"));

  const isCorrectPassword = await isExistUser.checkPassword(password);
  if (!isCorrectPassword)
    return res.json(new ApiResponse(false, 2, "Unvalid password"));

  const { _id, username } = isExistUser;
  const accessToken = isExistUser.generateAccessToken({ _id, username });
  if (!accessToken)
    return res.json(
      new ApiResponse(false, 0, "Server error, please try again")
    );

  res
    .cookie("accessToken", accessToken, {
      expires: new Date(Date.now() + 86400000),
      httpOnly: true,
      secure: false,
    })
    .cookie("username", username, {
      expires: new Date(Date.now() + 86400000),
      httpOnly: true,
      secure: false,
    })
    .status(200)
    .json(new ApiResponse(true, null, "User successfully login", { username }));
};
