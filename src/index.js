import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ origin: "*" }));

app.get("/ping", (req, res) => res.send("pong"));

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

app.listen(3000, () => {
  console.log("Servidor backend en http://localhost:3000");
});
