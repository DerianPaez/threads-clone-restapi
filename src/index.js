import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors({ origin: "*" }));

app.get("/ping", (req, res) => res.send("pong"));

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor backend active on PORT: ${PORT}`);
});
