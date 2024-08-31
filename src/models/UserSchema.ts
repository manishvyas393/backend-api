import mongoose, { Model } from "mongoose";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
import { IUser } from "../interfaces/schema.interface";
dotenv.config()
export interface IUserModel extends Model<IUser> {
      findByCredentials(email: string, password: string): Promise<IUser>;
}
const UserModel = new mongoose.Schema({
      username: {
            type: String,
            unique: true
      },  // unique
      email: {
            type: String,
            unique:true
      },  // unique
      password: String,  // hashed password
      role: { type: String, enum: ['admin', 'user'], default: 'user' },
}, { timestamps: true })

UserModel.methods.generateToken = function () {
      return jwt.sign({
            id: this._id
      }, process.env.JWT_SECRET as string)
}
UserModel.pre("save", async function (next) {
      if (this.isModified("password")) {
            this.password = await bcrypt.hash(this.password as string, 8)
      }
      next()
})
UserModel.statics.findByCredentials = async function (email: string, password: string): Promise<IUser> {
      const user = await this.findOne({ email });
      if (!user) {
            throw new Error('Unable to login');
      }
      const isMatch = await bcrypt.compare(password, user.password as string);
      if (!isMatch) {
            throw new Error('Unable to login');
      }
      return user;
};
const UserSchema = mongoose.model<IUser,IUserModel>("Users", UserModel)
export default UserSchema