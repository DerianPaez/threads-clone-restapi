import { pool } from "../db.js";
import bcrypt from "bcrypt";
import generateToken from "../lib/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const passwordEncrypted = await bcrypt.hash(password, 10);

    const [userAlreadyExists] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (userAlreadyExists.length > 0) {
      return res.status(409).json({ message: "User already exists!" });
    }

    await pool.query(
      "INSERT INTO users (fullname, email, password) VALUES(?, ?, ?)",
      [fullname, email, passwordEncrypted]
    );

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, users.at(0).password);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { id, fullname } = users.at(0);

    const token = await generateToken({
      id,
      fullname,
      email,
    });

    await pool.query(
      "UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [users.at(0).id]
    );

    res.json({ token, message: "Logged in successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
