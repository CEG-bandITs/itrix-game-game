import UserModel from "../../models/user";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {
  hash,
  validPhoneNumber,
  validEmail,
  validPassword,
} from "../../utils/validation";
import jwt from "jsonwebtoken";
import connectDB from "../../middleware/mongodb";

dotenv.config();

async function handler(req, res) {
  if (
    validEmail(req.body.email) &&
    validPassword(req.body.password) &&
    validPhoneNumber(req.body.number)
  ) {
    req.body.password = hash(req.body.password);
    try {
      const newUser = req.body;
      newUser.score = [
        {
          level: 0,
        },
        {
          level: 0,
        },
        {
          level: 0,
        },
      ];
      const user = await UserModel.create(newUser);
    } catch (e) {
      if (e.code == 11000) {
        res.status(400).json({
          msg: "Aldready User Exists With This Email ID",
        });
        return;
      } else {
        res.status(500).json({
          msg: "Internal Server Error",
        });
        return;
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

export default connectDB(handler);
