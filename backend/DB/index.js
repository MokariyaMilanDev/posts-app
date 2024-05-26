import mongoose from "mongoose"


export const connectDB = async (DBname)=>{
  mongoose.connect(`mongodb://localhost:27017/${DBname}`);
}