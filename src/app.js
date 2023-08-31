import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

// Middlewares
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.get("/ping", (req, res) => res.send("pong"));

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

export default app;
