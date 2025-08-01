import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    pin: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    image: {
      id: String,
      url: String,
    },
    tags: [
      { type: String }
    ],
    likes: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    ],
    comments: [
      {
        user: { type: String, required: true }, // keep as string or change to ObjectId if you prefer
        name: { type: String, required: true },
        comment: { type: String, required: true }
      }
    ]
  },
  { timestamps: true }
);

export const Pin = mongoose.model("Pin", schema);
