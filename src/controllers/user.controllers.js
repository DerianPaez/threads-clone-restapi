import { pool } from "../db.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const passwordEncrypted = await bcrypt.hash(password, 10);

    const [userAlreadyExists] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (userAlreadyExists.length > 0) {
      return res.status(409).json({ message: "User already exists!" });
    }

    const [newUser] = await pool.query(
      "INSERT INTO users (username, email, password) VALUES(?, ?, ?)",
      [username, email, passwordEncrypted]
    );

    res.status(201).json({
      id: newUser.insertId,
      username,
      email,
      password: passwordEncrypted,
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

    res.json({ user: users.at(0), message: "Logged in successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
