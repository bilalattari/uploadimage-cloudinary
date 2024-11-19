const { Schema, default: mongoose } = require("mongoose");

const imageSchema = new Schema(
  {
    title: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

export const ImageModal =
  mongoose.models.Images || mongoose.model("Images", imageSchema);
