import * as fs from "fs";
import * as path from "path";
import {
  Song,
  SongsData,
  CreateSongDTO,
  UpdateSongDTO,
} from "../types/song.types";

const songsData = path.join(__dirname, "..", "..", "songs.json");

// Leer todas las canciones
export async function readSongs(): Promise<Song[]> {
  try {
    const data = await fs.promises.readFile(songsData, "utf-8");
    const parsed: SongsData = JSON.parse(data);
    return parsed.songs;
  } catch (error) {
    return [];
  }
}

// Escribir canciones al archivo
async function writeSongs(songs: Song[]): Promise<void> {
  const data: SongsData = { songs };
  await fs.promises.writeFile(
    songsData,
    JSON.stringify(data, null, 2),
    "utf-8"
  );
}

// Obtener canción por ID
export async function getSongById(id: number): Promise<Song | null> {
  const songs = await readSongs();
  return songs.find((song) => song.id === id) || null;
}

// Crear nueva canción
export async function createSong(songData: CreateSongDTO): Promise<Song> {
  const songs = await readSongs();

  const maxId = songs.length > 0 ? Math.max(...songs.map((s) => s.id)) : 0;
  const newSong: Song = { id: maxId + 1, ...songData };
  songs.push(newSong);
  await writeSongs(songs);

  return newSong;
}

// Actualizar canción
export async function updateSong(
  id: number,
  updates: UpdateSongDTO
): Promise<Song | null> {
  const songs = await readSongs();
  const index = songs.findIndex((song) => song.id === id);

  if (index === -1) {
    return null;
  }

  songs[index] = { ...songs[index], ...updates };
  await writeSongs(songs);

  return songs[index];
}

// Eliminar canción
export async function deleteSong(id: number): Promise<Song | null> {
  const songs = await readSongs();
  const index = songs.findIndex((song) => song.id === id);

  if (index === -1) {
    return null;
  }

  const deletedSong = songs[index];
  songs.splice(index, 1);
  await writeSongs(songs);

  return deletedSong;
}
