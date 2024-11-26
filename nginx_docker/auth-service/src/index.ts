import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import authRoute from "./routes/authRoutes";
import mongoose from "mongoose";

dotenv.config({ path: ".env" });
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
const MONGODB_URI =
  process.env.MONGO_URI || "mongodb://mongodb:27017/my_database";
const connectToDb = async () => {
  try {
    const connect = await mongoose.connect(MONGODB_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.log(`Error connecting db`, error.message);
  }
};

connectToDb();

app.get("/health", async (req: Request, res: Response) => {
  res.json({ msg: "Auth service is running" });
});

app.use("/", authRoute);

app.listen(PORT, () => {
  console.log(`Auth-Server listening at port ${PORT}`);
});
