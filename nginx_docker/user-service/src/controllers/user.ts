import { Request, Response } from "express";
import { User } from "../models/user";

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ msg: "User not found", success: false });
      return;
    }
    res
      .status(200)
      .json({ msg: "User fetched successfully", user: user, success: true });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};
