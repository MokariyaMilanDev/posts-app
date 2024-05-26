import { userModel } from "../models/user.model.js";
import { ApiResponse } from "../utils/CLASSES.js";

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
    console.log("All fields are required");
    return res.json(new ApiResponse(false, 0, "All fields are required"));
  }

  if (username.length <= 2 || username.length >= 12) {
    console.log("Username must be between 2-12 letters");
    return res.json(
      new ApiResponse(false, 1, "Username must be between 2-12 letters")
    );
  }

  if (!gmail.includes("@") || !gmail.includes(".")) {
    console.log("Unvalid gmail");
    return res.json(new ApiResponse(false, 2, "Unvalid gmail"));
  }

  if (phone.toString().length < 10 || phone.toString().length >= 11) {
    console.log("Unvalid phone number");
    return res.json(new ApiResponse(false, 3, "Unvalid phone number"));
  }

  if (password !== confirmPassword) {
    console.log("Both passwords are must be same");
    return res.json(new ApiResponse(false, 4, "Both passwords are must be same"));
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

  if (!createdUser)
    return res.json(new ApiResponse(false, 0, "Server error"));

  return res
    .status(200)
    .json(new ApiResponse(true, "User created successfuly"));
};
