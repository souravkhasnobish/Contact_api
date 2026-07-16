import express from "express";
import { register,login } from "../Controller/user.js";
const router = express.Router()

//User Routes
//@api desc=register
//@api method=post
//@api endPoint=/api/user/register
router.post("/register", register)
router.post("/login", login);

export default router;