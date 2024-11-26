import express from "express";
import { addUser, deleteUser, getUser, updateUser } from "../controllers/user";

const router = express.Router();

router.get("/get/:id", getUser)

router.post("/create/", addUser)

router.put("/update/:id", updateUser)

router.delete("/delete/:id", deleteUser)


export default router