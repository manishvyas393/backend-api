import { Request, Response } from "express";
import UserSchema from "../models/UserSchema";
const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true
}
export const signUp = async (req: Request, res: Response) => {
      try {
            const { username, email, password } = req.body
            const user = await UserSchema.create({
                  username,
                  email,
                  password
            })
            const token = user.generateToken()
            return res.status(201).cookie("token", token, options).json({
                  success: true,
                  user,
                  token
            })

      } catch (error) {
            const message = (error as Error).message
            return res.status(500).json({
                  success: false,
                  error: message
            })
      }
}

export const login = async (req: Request, res: Response) => {
      try {
            const { email, password } = req.body
            const user = await UserSchema.findByCredentials(email, password)
            const token = user.generateToken()
            return res.status(200).cookie("token", token, options).json({
                  success: true,
                  user
            })
      } catch (error) {
            const message = (error as Error).message
            return res.status(500).json({
                  success: false,
                  error: message
            })
      }
}

export const getUserProfile = async (req: Request, res: Response) => {
      try {
            return res.status(200).json({
                  success: true,
                  user: req.currentUser
            })
      } catch (error) {
            const message = (error as Error).message
            return res.status(500).json({
                  success: false,
                  error: message
            })
      }
}