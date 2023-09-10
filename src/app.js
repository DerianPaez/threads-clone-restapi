import express from "express";
import morgan from "morgan";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";

import { verifyToken } from "./middlewares/verifyToken.js";

const app = express();

// Middlewares
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.get("/ping", (_req, res) => res.send("pong"));
app.use("/api/user", userRoutes);
app.use("/api/post", [verifyToken], postRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

export default app;
