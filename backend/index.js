import express from "express";
import authRouter from "./routes/auth.router.js";
import { connectDB } from "./DB/index.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.router.js";

const app = express();

dotenv.config({ path: ".env" });

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(cookieParser());

connectDB(process.env.DATABASE_NAME)
  .then(() => {
    console.log("DB connected successfuly");
  })
  .catch((error) => {
    console.log("DB connection failed !\n", error);
  });

app.get("/", (req, res) => {
  res.send("Home Route")
});

app.use("/auth", authRouter);
app.use("/in", userRouter);



app.listen(process.env.PORT || 8000, () => {
  console.log(`App is running on ${process.env.PORT || 8000} port`);
});
