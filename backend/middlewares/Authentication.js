import mongoose from "mongoose";
import { userModel } from "../models/user.model.js";
import { ApiResponse } from "../utils/CLASSES.js";
import jwt from "jsonwebtoken";

export const Authentication = async (req, res, next)=>{
  console.log("||| Authentication |||");

   const username = req.params.username;
   const cookieUsername = req.cookies.username;
   if(username !== cookieUsername)
    return res.json(
      new ApiResponse(
        false,
        401,
        "Unauthorized request (unvalid user)"
      )
    );

   const accessToken = req.cookies.accessToken;
   if (!accessToken)
     return res.json(
       new ApiResponse(
         false,
         401,
         "Unauthorized request (access token missing)"
       )
     );

   const { _id } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
   const isExistUser = await userModel.findOne({
     $and: [{ _id: new mongoose.Types.ObjectId(_id) }, { username }],
   });
   if (!isExistUser)
     return res.json(
       new ApiResponse(false, 401, "Unauthorized request (unvalid user)")
     );
  
  next();
}