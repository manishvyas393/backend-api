import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import UserSchema from "../models/UserSchema";
import { IUser } from "../interfaces/schema.interface";
interface UserPayload {
      id: string;
      email: string;
}
declare global {
      namespace Express {
            interface Request {
                  currentUser?: IUser
            }
      }
}
export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
      try {
            const { token } = req.cookies
            if (!token) {
                  return res.status(400).json({
                        success: false,
                        message: "please login...."
                  })
            }
            const decodeToken = jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload
            const user = await UserSchema.findById(decodeToken.id)
            req.currentUser = user as IUser
            next()

      } catch (error) {
            const message = (error as Error).message
            return res.status(500).json({
                  success: false,
                  error: message
            })
      }
}