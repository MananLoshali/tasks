import { Request, Response } from "express";
import { User } from "../models/user";
import bcrypt from "bcryptjs";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      res.status(404).json({ msg: "All fields are required", success: false });
      return;
    }
    let hashedPassword: string;
    
    hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ msg: "new user created", user: savedUser, success: true });
  } catch (error) {
    console.log(error, "server error");

    res.status(500).json({ msg: "Internal server error", success: false });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(404).json({ msg: "All fields are required", success: false });
      return;
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json({ msg: "User not found", success: false });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ msg: "Password is incorrect", success: false });
      return;
    }
    res.status(201).json({ msg: "user login successfully", success: true });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error", success: false });
  }
};
