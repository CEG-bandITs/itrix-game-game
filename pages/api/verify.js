import cookie from "cookie";
import jwt from "jsonwebtoken";

export default function handler(req, res) {
  const { cookies } = req;
  console.log("Verfied: ", jwt.verify(cookies.jwt, process.env.SECRET_KEY));
  res.send();
}
