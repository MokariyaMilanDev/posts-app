import mongoose, { Schema, model } from "mongoose"

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    auther:{
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    like:{
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
);



export const postModel = model("posts", postSchema);