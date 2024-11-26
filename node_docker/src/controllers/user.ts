import { Request, Response } from "express";
import { User } from "../models/user";
import mongoose from "mongoose";

export const addUser = async (req: Request, res: Response) => {
  const { name, age, gender, address } = req.body;
  try {
    const user = new User({
      name,
      age,
      gender,
      address,
    });
    const newUser = await user.save();
    res
      .status(201)
      .json({ msg: "User created successfully", user: newUser, success: true });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", success: false });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
     res.status(400).json({ error: "Invalid ID format" });
     return;
  }
  const { name, age, gender, address } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ msg: "User not found", success: false });
      return;
    }
    user.name = name;
    user.address = address;
    user.gender = gender;
    user.age = age;

    await user.save();
    res
      .status(201)
      .json({ msg: "User updated successfully", user: user, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error, success: false });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
     res.status(400).json({ error: "Invalid ID format" });
     return
  }
  try {
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ msg: "User not found", success: false });
      return;
    }
    res.json({ msg: "User fetched successfully", user: user, success: true });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", success: false });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
     res.status(400).json({ error: "Invalid ID format" });
     return
  }
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({ msg: "User not found", success: false });
      return;
    }
    res.json({ msg: "User deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", success: false });
  }
};
