import { Schema, model } from "mongoose";

const dormSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },

  info: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true
  },

  images: [{ type: String }],

  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});

export default model("Dorm", dormSchema);
