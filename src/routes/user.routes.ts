import { Router } from "express";
import { getUserProfile, login, signUp } from "../controllers/auth.controller";
import { checkAuth } from "../middlewares/checkAuth";
const userRouter = Router()

userRouter.post("/signup", signUp)
userRouter.post("/login", login)
userRouter.get("/profile",checkAuth,getUserProfile)

export default userRouter