import crypto from "crypto";

export function validPhoneNumber(ph) {
  if (/[0-9]{10}/g.test(ph)) return true;
  else return false;
}

export function validEmail(email) {
  if (
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    )
  )
    return true;
  else return false;
}

export function validPassword(password) {
  if (password.length >= 8) return true;
  else return false;
}

export function hash(str) {
  return crypto.createHash("sha256").update(str).digest("hex");
}
