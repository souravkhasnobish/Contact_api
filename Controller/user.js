import { User } from "../Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (name == "" || email == "" || password == "") {
    return res.json({ message: "All fields are required" });
  }

  let user = await User.findOne({ email });

  if (user) return res.json({ message: "User already exist", success: false });

  let hashpassword = await bcrypt.hash(password, 10);

  user = await User.create({ name, email, password: hashpassword });
  res.json({ message: "User Created Sucessfully", success: true, user });
};

export const login = async (req, res) => {
  const { name, email, password } = req.body;
  if (name == "" || email == "" || password == "") {
    return res.json({ message: "All fields are required" });
  }

  const user = await User.findOne({ email });

  if (!user)
    return res.json({ message: "User does not exist", success: false });

  const validpassword = await bcrypt.compare(password, user.password);

  if (!validpassword) return res.json({ message: "invalid password" });

  const token = jwt.sign({ userid: user._id }, process.env.JWT, {
    expiresIn: "1d",
  });

  res.json({ message: `welcome ${user.name}`, token, success: true });
};
