import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
      min: 4,
   },
   desc: {
      type: String,
      required: true,
      min: 100,
   },
   imageUrl: {
      type: String,
      required: true,
   },
   category: {
      type: String,
      required: true,
      enum: [
         'HTML',
         'CSS',
         'Jquery',
      ]
   },
   authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   },
   likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: []
   }
}, { timestamps: true })

export default mongoose?.models?.Post || mongoose.model("Post", PostSchema)