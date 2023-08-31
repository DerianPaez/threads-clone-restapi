import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));

app.get("/ping", (req, res) => res.send("pong"));

app.listen(3000, () => {
  console.log("Servidor backend en http://localhost:3000");
});
