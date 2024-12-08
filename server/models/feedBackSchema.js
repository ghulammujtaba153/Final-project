import mongoose from "mongoose";

const feedBackSchema = new mongoose.Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  liked: {
    type: String,
    required: true,
  },
  disliked: {
    type: String,
    required: true,
  },
  suggestion: {
    type: String,
    required: true,
  },
});

const FeedBack = mongoose.model("FeedBack", feedBackSchema);

export default FeedBack;
