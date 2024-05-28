import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    gmail: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", async function (next){
  if(!this.isModified("password")){
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.checkPassword = async function(password){
  const isCorrectPassword = await bcrypt.compare(password, this.password);
  if(!isCorrectPassword) return false;

  return true;
}

userSchema.methods.generateAccessToken = function(payload){
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
  return accessToken;
}

export const userModel = model("users", userSchema);
