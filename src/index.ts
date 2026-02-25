import express from "express";
import songsRouter from "./routes/song.routes";
import { staticServer } from "./staticServer";
import { connectDB } from "./db/postgres";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://track-library.netlify.app",
    ],
  }),
);

const port = process.env["PORT"] || 3000;

app.use(express.json());

app.use("/api", songsRouter);

app.use(staticServer);

app.listen(port, async () => {
  await connectDB();
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  console.log(`📁 Archivos estáticos: http://localhost:${port}/index.html`);
  console.log(`🎶 API: http://localhost:${port}/api/songs`);
});
