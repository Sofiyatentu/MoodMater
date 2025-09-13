import express from "express";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedpassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedpassword });
  await newUser.save();
  res.status(201).json({ message: "Signup successful" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: "User doesn't exist" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Password is incorrect" });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  res.status(200).json({ message: "Login successful", token });
});

export default router;
