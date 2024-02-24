import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema({
   category: {
      type: String,
      required: true
   },
   icon: {
      type: String,
      required: true
   }
},
   {
      timestamps: true
   }
);

export default mongoose.models.Category || mongoose.model("Category", categorySchema);
