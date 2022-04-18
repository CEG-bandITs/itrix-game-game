import { verify } from "jsonwebtoken";
import mongoose from "mongoose";
import UserModel from "../../models/user";
import configuration from "../../config";
import connectDB from "../../middleware/mongodb";

async function handler(req, res) {
  if (req.cookies.jwt == undefined) {
    res.json({
      msg: "No JWT",
    });
    return;
  }

  const { email } = verify(req.cookies.jwt, process.env.SECRET_KEY);

  const user = await UserModel.find({ email: email });

  if (user.length > 1) {
    res.json({
      msg: "Many Users are avaliable with this email",
    });
  }

  if (user.length == 0) {
    res.json({
      msg: "No Users are avaliable with this email",
    });
  }

  let currentDate = configuration.config.currentDate;
  let level = user[0].score[currentDate].level;

  res.json({
    imgs: configuration.config.levelQuestions[currentDate][level].imgs,
    hints: configuration.config.levelQuestions[currentDate][level].hints,
  });
}

export default connectDB(handler);
