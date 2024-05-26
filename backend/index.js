import express from "express";
import authRouter from "./routes/auth.router.js";
import { connectDB } from "./DB/index.js";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

dotenv.config({path: ".env"});

app.use(express.json());
app.use(
  cors({ credentials: true, origin: true })
);


connectDB(process.env.DATABASE_NAME)
  .then(() => {
    console.log("DB connected successfuly");
  })
  .catch((error) => {
    console.log("DB connection faild !\n", error);
  });

app.get("/", (req, res) => {
  res.send("Home page");
});


app.use("/auth", authRouter);

app.listen(8000, () => {
  console.log(`App is running on 8000 port`);
});
