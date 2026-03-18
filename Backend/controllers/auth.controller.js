import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// Signup controller start
export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Authentication for email exist
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "Email already exists !" });
    }
    // Authentication for password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must pe atleast 6 characters !" });
    }
    // Authentication for hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      password: hashedPassword,
      email,
    });

    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: false,
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: `sign up error ${error}` });
  }
};
// Signup controller end

// Login Controller start
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Authentication for email exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email does not exists !" });
    }
    // Authentication for password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: false,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `login error ${error}` });
  }
};
// Login controller end

// Logout Controller start
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout Sucessfully" });
  } catch (error) {
    return res.status(500).json({ message: `logout error ${error}` });
  }
};
