import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

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

export const userModel = model("users", userSchema);
