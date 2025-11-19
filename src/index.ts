import express from "express";
import songsRouter from "./routes/song.routes";
import { staticServer } from "./staticServer";
import { connectDB } from "./db/postgres";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env["DB_PORT"] || 3000;

app.use(express.json());

app.use("/api", songsRouter);

app.use(staticServer);

app.listen(port, async () => {
  await connectDB();
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  console.log(`📁 Archivos estáticos: http://localhost:${port}/index.html`);
  console.log(`🎶 API: http://localhost:${port}/api/songs`);
});
