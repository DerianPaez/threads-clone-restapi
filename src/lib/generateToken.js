import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export default function generateToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET, { expiresIn: "30m" }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}
