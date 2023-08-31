import app from "./app.js";
import { FRONTEND_URL, PORT } from "./config.js";

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor backend active on ${FRONTEND_URL}:${PORT}`);
});
