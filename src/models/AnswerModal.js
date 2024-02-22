import mongoose from "mongoose";

const ANswerSchema = new mongoose.Schema({
    answerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quest",
      required: true,
   },
   authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   text: {
      type: String,
      required: true,
   }
}, { timestamps: true })

export default mongoose?.models?.Answer || mongoose.model("Answer", ANswerSchema)