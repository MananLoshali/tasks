import express, { Request, Response } from "express";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute";
import mongoose from "mongoose";

dotenv.config({ path: ".env" });

const app: express.Application = express();

app.use(express.json())
const PORT: string | number = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGO_URI;
const connectToDb = async () => {
    try {
        const connect = await mongoose.connect(MONGODB_URI,{
            dbName: process.env.DB_NAME
        })
        console.log("Database connected successfully");
    } catch (error) {
        console.log(`Error connecting db`, error.message);
    }
};

connectToDb();
app.get("/", (req: Request, res: Response) => {
  res.json({
    msg: "Welcome to node, mongo, typescript application on docker",
    success: true,
  });
});

app.use("/api/user/", userRoute);

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
