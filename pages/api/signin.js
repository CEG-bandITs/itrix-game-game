import jwt from "jsonwebtoken";
import { validEmail, hash } from "../../utils/validation";
import UserModel from "../../user";
import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URL, () => {
  console.log("Connected to MongoDB");
});

export default async function handler(req, res) {
  if (req.body.email === "" && req.body.password === "") {
    res.status(400).json({
      msg: "Send Email And Password",
    });
    return;
  }

  if (!validEmail(req.body.email)) {
    res.status(400).json({
      msg: "Invalid Email",
    });
    return;
  }

  const user = await UserModel.find({ email: req.body.email });

  console.log(user[0].password, hash(req.body.password));
  if (hash(req.body.password) == user[0].password) {
    const token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY);
    res.status(200).json({ token: token, msg: "Success" });
    return;
  }
  res.status(400).json({ msg: "Wrong Username Password" });
}
