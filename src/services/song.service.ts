import { Song } from "../models/song";
import { PostgreSongRepository } from "../repositories/postgresSong.repository";
import { SongRepository } from "../repositories/song.repository";

const songRepository: SongRepository = new PostgreSongRepository();
// Obtener todas las song
export async function getAllSongs(): Promise<Song[]> {
  return await songRepository.findAll();
}
//Obtener una song por id
export async function getSongById(id: number): Promise<Song | null> {
  const song = await songRepository.findById(id);
  return song;
}
//Crear una nueva song
export async function createSong(newSong: Song): Promise<Song> {
  const requiredFields = {
    title: "El título no puede estar vacío",
    artist: "El artista no puede estar vacío",
    album: "El álbum no puede estar vacío",
    year: "El año es obligatorio y debe ser un número",
    genre: "El género no puede estar vacío",
  };

  for (const [key, message] of Object.entries(requiredFields)) {
    const value = newSong[key as keyof Song];
    if (typeof value === "string" && !value.trim()) {
      throw new Error(message);
    }
  }

  if (!newSong.year || isNaN(newSong.year)) {
    throw new Error(requiredFields.year);
  }

  if (newSong.year < 1700) {
    throw new Error("El año no puede ser menor a 1700");
  }

  return await songRepository.save(newSong);
}
// Actualizar una song
export async function updateSong(
  id: number,
  updatedFields: Partial<Song>
): Promise<Song> {
  if (!id || isNaN(id)) {
    throw new Error("ID inválido");
  }

  const existingSong = await songRepository.findById(id);
  if (!existingSong) {
    throw new Error("La canción no existe");
  }

  const textFields = {
    title: "El título no puede estar vacío",
    artist: "El artista no puede estar vacío",
    album: "El álbum no puede estar vacío",
    genre: "El género no puede estar vacío",
    year: "El año debe ser un número válido", // se valida aparte
  };

  for (const [key, message] of Object.entries(textFields)) {
    const fieldKey = key as keyof Song;
    const value = updatedFields[fieldKey];

    if (value !== undefined && typeof value === "string" && !value.trim()) {
      throw new Error(message);
    }
  }

  if (updatedFields.year !== undefined) {
    const year = Number(updatedFields.year);
    if (isNaN(year)) {
      throw new Error("El año debe ser un número válido");
    }
    if (year < 1700) {
      throw new Error("El año no puede ser menor a 1700");
    }
  }

  const songToUpdate: Song = { ...existingSong, ...updatedFields };

  return await songRepository.update(songToUpdate);
}
// Eliminar una song por su ID
export async function deleteSong(id: number): Promise<boolean> {
  if (!id || isNaN(id)) {
    throw new Error("ID inválido");
  }

  const existingSong = await songRepository.findById(id);
  if (!existingSong) {
    throw new Error("La canción no existe");
  }

  const deleted = await songRepository.delete(id);
  if (!deleted) {
    throw new Error("Error al eliminar la canción");
  }
  return true;
}
