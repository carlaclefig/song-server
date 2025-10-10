import { Client } from "pg";

export const client = new Client({
  host: "localhost",
  user: "", // agregar user
  password: "", // agregar password
  database: "music",
  port: 5432,
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
