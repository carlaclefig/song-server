import { Router, Request, Response } from "express";
import {
  readSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
  replaceSong,
} from "./songs.controller";
import {
  CreateSongDTO,
  ReplaceSongDTO,
  UpdateSongDTO,
} from "../types/song.types";

const router = Router();

// GET /api/songs
router.get("/songs", async (_req: Request, res: Response) => {
  try {
    const songs = await readSongs();
    return res.json({ ok: true, data: songs });
  } catch (error: any) {
    return res.status(500).json({ error: true, message: error.message });
  }
});

// POST /api/songs
router.post("/songs", async (req: Request, res: Response) => {
  try {
    const { title, artist, album, year, genre } = req.body;

    if (!title || !artist || !album || !year || !genre) {
      return res.status(400).json({
        error: true,
        message: "Faltan campos requeridos",
      });
    }

    const songData: CreateSongDTO = { title, artist, album, year, genre };
    const newSong = await createSong(songData);

    return res.status(201).json({ ok: true, data: newSong });
  } catch (error: any) {
    return res.status(500).json({ error: true, message: error.message });
  }
});

// GET /api/song/:id
router.get("/song/:id", async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ error: true, message: "ID inválido" });
    }

    const song = await getSongById(id);

    if (!song) {
      return res
        .status(404)
        .json({ error: true, message: "Canción no encontrada" });
    }

    return res.json({ ok: true, data: song });
  } catch (error: any) {
    return res.status(500).json({ error: true, message: error.message });
  }
});

// PATCH /api/song/:id - cambios parciales
router.patch(
  "/song/:id",
  async (req: Request<{ id: string }>, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        return res.status(400).json({ error: true, message: "ID inválido" });
      }

      const updates: UpdateSongDTO = req.body;
      const updatedSong = await updateSong(id, updates);

      if (!updatedSong) {
        return res
          .status(404)
          .json({ error: true, message: "Canción no encontrada" });
      }

      return res.json({ ok: true, data: updatedSong });
    } catch (error: any) {
      return res.status(500).json({ error: true, message: error.message });
    }
  }
);

// PUT /api/song/:id - reemplace todo el objeto
router.put("/song/:id", async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ error: true, message: "ID inválido" });
    }

    const newSong: ReplaceSongDTO = req.body;
    const replacedSong = await replaceSong(id, newSong);

    if (!replacedSong) {
      return res
        .status(404)
        .json({ error: true, message: "Canción no encontrada" });
    }

    return res.json({ ok: true, data: replacedSong });
  } catch (error: any) {
    return res.status(500).json({ error: true, message: error.message });
  }
});

// DELETE /api/song/:id
router.delete(
  "/song/:id",
  async (req: Request<{ id: string }>, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        return res.status(400).json({ error: true, message: "ID inválido" });
      }

      const deletedSong = await deleteSong(id);

      if (!deletedSong) {
        return res
          .status(404)
          .json({ error: true, message: "Canción no encontrada" });
      }

      return res.json({ ok: true, data: deletedSong });
    } catch (error: any) {
      return res.status(500).json({ error: true, message: error.message });
    }
  }
);

export default router;
