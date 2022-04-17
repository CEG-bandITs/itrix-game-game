import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
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

const Model = mongoose.model("User", userSchema);

export default Model;
