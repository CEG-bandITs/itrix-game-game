import jwt from "jsonwebtoken";
import { validEmail, hash } from "../../utils/validation";
import UserModel from "../../models/user";
import connectDB from "../../middleware/mongodb";

async function handler(req, res) {
  if (req.body.email === "" && req.body.password === "") {
    res.status(400).json({
      msg: "Send Email And Password",
    });
    return;
  }
  if (!validEmail(req.body.email)) {
    res.status(400).json({
      msg: "Invalid Email Syntax",
      info: req.body,
    });
    return;
  }

  try {
    const user = await UserModel.find({ email: req.body.email });

    if (user.length == 0) {
      res.json({
        msg: "User not created. Sign Up",
      });
      return;
    }
    if (hash(req.body.password) == user[0].password) {
      const token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY);
      res.status(200).json({ token: token, msg: "Success" });
      return;
    }
    res.status(400).json({ msg: "Wrong Username Password" });
  } catch (e) {
    res.status(500).json({
      msg: "internal server erro",
    });
  }
}

export default connectDB(handler);
