import { pool } from "../db.js";

export const getFeed = async (_req, res) => {
  try {
    const [posts] = await pool.query(
      "SELECT * FROM posts ORDER BY created_at DESC"
    );

    res.status(200).json({ posts, message: "Posts retrieved successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createPost = async (req, res) => {
  try {
    const userId = req.user_id;
    const { title, content } = req.body;

    const [newPost] = await pool.query(
      "INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)",
      [title, content, userId]
    );

    res.status(201).json({ id: newPost.insertId, title, content });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const userId = req.user_id;
    const { id } = req.query;

    const [posts] = await pool.query("SELECT * FROM posts WHERE id = ?", [id]);

    if (!posts.length) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (posts.at(0).user_id !== userId) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    await pool.query("DELETE FROM posts WHERE id = ?", [id]);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
