import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGODB_URL, () => {
  console.log("Connected to MongoDB");
});

export default function handler(req, res) {
  console.log("To /login Req: ", req.body);
  if (req.body.email == "muthu892542@gmail.com") {
    const token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY);
    res.json({ token: token });
  } else res.status(400).json({ msg: "Error" });
}
