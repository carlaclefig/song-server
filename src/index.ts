import express from "express";

const app = express();
const port = 3000;

// Middleware para parsear JSON en el body
app.use(express.json());

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
