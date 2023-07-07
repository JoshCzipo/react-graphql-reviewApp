import { Schema, model } from "mongoose";

const reviewSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },

  rating: {
    type: Number,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },

  dorm: {
    type: Schema.Types.ObjectId,
    ref: "Dorm",
  },

  
});

export default model("Review", reviewSchema);
