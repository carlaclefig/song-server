import { Client } from "pg";

export const client = new Client({
  host: process.env["DB_HOST"],
  user: process.env["DB_USER"],
  password: process.env["DB_PASSWORD"],
  database: process.env["DB_NAME"],
  port: Number(process.env["DB_PORT"]),
});

export async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Conexión exitosa");
  } catch (error) {
    console.log("Error en conexión", error);
    process.exit(1);
  }
}
