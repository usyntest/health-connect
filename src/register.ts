import { Request, Response } from "express";
import { User } from "../models/user";

const register = async (req: Request, res: Response) => {
  const user = req.body;
  const { name, email, password } = user;

  try {
    const emailAlreadyExists = await User.findOne({
      email: email,
    });

    if (emailAlreadyExists) {
      return res.status(400).json({
        status: 400,
        message: "Email all ready in use",
      });
    }

    const newUser = await User.create({ name, email, password });

    res.status(200).json({
      status: 200,
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(`[server]: ${error}`);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

export default register;
