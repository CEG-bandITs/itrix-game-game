import UserModel from "../../user";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {
  hash,
  validPhoneNumber,
  validEmail,
  validPassword,
} from "../../utils/validation";
import jwt from "jsonwebtoken";

mongoose.connect(process.env.MONGODB_URL, () => {
  console.log("Connected to MongoDB");
});

dotenv.config();

export default async function handler(req, res) {
  if (
    validEmail(req.body.email) &&
    validPassword(req.body.password) &&
    validPhoneNumber(req.body.number)
  ) {
    req.body.password = hash(req.body.password);
    try {
      const user = await UserModel.create(req.body);
    } catch (e) {
      if (e.code == 11000) {
        res.status(400).json({
          msg: "Aldready User Exists With This Email ID",
        });
      } else {
        res.status(500).json({
          msg: "Internal Server Error",
        });
      }
    }
    res.json({
      token: jwt.sign({ email: req.body.email }, process.env.SECRET_KEY),
      msg: "Success",
    });
    return;
  }
  res.json({
    msg: "Either Invalid Email or Invalid Phone Number or Invalid Password",
  });
}
