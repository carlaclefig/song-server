import express from "express";
import songsRouter from "./api/songs.routes";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api", songsRouter);

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  console.log(`📁 Archivos estáticos: http://localhost:${port}/index.html`);
  console.log(`🎶 API: http://localhost:${port}/api/songs`);
  console.log(`🎵 API canción: http://localhost:${port}/api/song`);
});
