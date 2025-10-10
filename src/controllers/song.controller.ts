import e, { Request, Response } from "express";
import * as songService from "../services/song.service";
// Obtener todas las song
export async function getSongs(_req: Request, res: Response) {
  try {
    const songs = await songService.getAllSongs();
    res.status(200).json(songs);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error al obtener canciones", error: true });
  }
}
//Obtener una song por id
export async function getSong(req: Request<{ id: string }>, res: Response) {
  try {
    // Para que ""/" " no lo tome como 0
    const idTrimmed = req.params.id.trim();
    if (idTrimmed === "" || isNaN(Number(idTrimmed))) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const idNumber = Number(idTrimmed);

    const song = await songService.getSongById(idNumber);

    if (!song) {
      return res.status(404).json({ message: "Canción no encontrada" });
    }

    return res.status(200).json(song);
  } catch (error: any) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error al obtener canción", error: true });
  }
}
//Crear una nueva song
export async function addSong(req: Request, res: Response) {
  try {
    const newSong = await songService.createSong(req.body);
    return res.status(201).json(newSong);
  } catch (error: any) {
    return res
      .status(400)
      .json({ message: "No se pudo crear la canción", error: true });
  }
}
// Actualizar una song
export async function updateSong(req: Request<{ id: string }>, res: Response) {
  try {
    const id = Number(req.params.id);
    const updatedSong = await songService.updateSong(id, req.body);

    return res.status(200).json(updatedSong);
  } catch (error: any) {
    return res
      .status(400)
      .json({ message: "No se pudo actualizar la canción", error: true });
  }
}
// Eliminar una song por su ID
export async function deleteSong(req: Request<{ id: string }>, res: Response) {
  try {
    const id = Number(req.params.id);
    const deleted = await songService.deleteSong(id);

    if (!deleted) {
      return res.status(404).json({ message: "Canción no encontrada" });
    }

    return res.status(200).json({ message: "Canción eliminada correctamente" });
  } catch (error: any) {
    return res.status(500).json({ message: "error.message" });
  }
}
