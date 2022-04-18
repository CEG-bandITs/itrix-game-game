import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    index: { unique: true },
  },
  name: String,
  number: String,
  college: String,
  password: String,
  score: [
    {
      lastUpdate: {
        type: Date,
        default: new Date(0),
      },
      level: {
        type: Number,
        default: 0,
      },
    },
    {
      lastUpdate: {
        type: Date,
        default: new Date(0),
      },
      level: {
        type: Number,
        default: 0,
      },
    },
    {
      lastUpdate: {
        type: Date,
        default: new Date(0),
      },
      level: {
        type: Number,
        default: 0,
      },
    },
  ],
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
