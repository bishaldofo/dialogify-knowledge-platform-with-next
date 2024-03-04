import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true,
      unique: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
   },
   name: {
      type: String,
      default: "",
   },
   profileImage: {
      type: String,
      default: "",
   },
   role: {
      type: String,
      enum: ['admin', 'user'], // Possible roles
      default: 'user', // Default role is user
   }
}, {timestamps: true}
)

export default mongoose?.models?.User || mongoose.model("User", UserSchema)