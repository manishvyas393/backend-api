import mongoose  from "mongoose";

const UserModel = new mongoose.Schema({
      username: String,  // unique
      email: String,  // unique
      password: String,  // hashed password
      role: { type: String, enum: ['admin', 'user'], default: 'user' },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
})

const UserSchema = mongoose.model("Users", UserModel)
export default UserSchema