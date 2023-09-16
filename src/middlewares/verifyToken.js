import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export const verifyToken = async (req, res, next) => {
  try {
    const tokenBearer = req.headers.authorization;

    if (!tokenBearer) {
      return res.status(401).json({ message: "No token provided" });
    }

    if (!tokenBearer.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const token = tokenBearer.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user_id = decoded.id;

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Unauthorized" });
  }
};
