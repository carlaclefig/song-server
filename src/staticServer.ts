import { Request, Response, NextFunction } from "express";
import * as fs from "fs";
import * as path from "path";
import mime from "mime-types";

const publicDir = path.join(__dirname, "..", "public");

export const staticServer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method !== "GET") {
    return next();
  }

  if (req.path.startsWith("/api")) {
    return next();
  }

  try {
    const filePath = path.join(publicDir, req.path);

    if (!filePath.startsWith(publicDir)) {
      return serve404(res);
    }

    const stats = await fs.promises.stat(filePath);

    if (stats.isDirectory()) {
      return serve404(res);
    }

    const mimeType = mime.lookup(filePath) || "application/octet-stream";
    res.setHeader("Content-Type", mimeType);

    const readStream = fs.createReadStream(filePath);

    readStream.on("error", () => {
      return res.status(500).json({ error: "Error al leer el archivo" });
    });

    readStream.pipe(res);
  } catch (error: any) {
    if (error.code === "ENOENT") {
      return serve404(res);
    }

    console.error("Error en staticServer:", error);
    res.status(500).json({ error: error.message });
  }
};

async function serve404(res: Response) {
  try {
    const notFoundPath = path.join(publicDir, "404.html");
    const notFoundContent = await fs.promises.readFile(notFoundPath);
    res
      .status(404)
      .setHeader("Content-Type", "text/html")
      .send(notFoundContent);
  } catch {
    res.status(404).json({ error: "Archivo no encontrado" });
  }
}
