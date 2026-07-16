import { User } from "../Models/user.js";
import jwt from "jsonwebtoken"

export const isAuthenticated = async (req, res, next) => {
  const token = req.header("Auth")
  
  if (!token) return res.json({ message: "Login first" })
  
  
  const decoded = jwt.verify(token,process.env.JWT);
  // console.log(decoded);
  const id = decoded.userid;

  let user = await User.findById(id)
  if (!user) res.json("message:User not found")
  req.user = user
  
  next()
  
}