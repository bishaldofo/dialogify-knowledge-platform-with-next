import mongoose from "mongoose";

const QuestSchema = new mongoose.Schema({
   
   quest: {
      type: String,
      required: true,
      min: 100,
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

export default mongoose?.models?.Quest || mongoose.model("Quest", QuestSchema)