import { client } from "../db/postgres";
import { Song } from "../models/song";
import { SongRepository } from "./song.repository";

export class PostgreSongRepository implements SongRepository {
  // Traer todas las songs
  async findAll(): Promise<Song[]> {
    const songs = await client.query(
      "SELECT id, title, artist, album, year, genre FROM songs"
    );
    return songs.rows;
  }
  // Traer song por ID
  async findById(id: number): Promise<Song | null> {
    const songId = await client.query(
      "SELECT id, title, artist, album, year, genre FROM songs WHERE id = $1",
      [id]
    );
    return songId.rows.length ? songId.rows[0] : null;
  }
  // Crear nueva song
  async save(song: Song): Promise<Song> {
    const query = `
      INSERT INTO songs ( title, artist, album, year, genre)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const values = [song.title, song.artist, song.album, song.year, song.genre];

    const result = await client.query(query, values);
    return result.rows[0];
  }
  //Editar song
  async update(song: Song): Promise<Song> {
    await client.query(
      "UPDATE songs SET title = $1, artist = $2, album =$3, year = $4, genre = $5  WHERE id = $6",
      [song.title, song.artist, song.album, song.year, song.genre, song.id]
    );
    return song;
  }
  //Eliminar song
  async delete(id: number): Promise<boolean> {
    const songDelete = await client.query("DELETE FROM songs WHERE id = $1", [
      id,
    ]);
    return songDelete.rowCount !== null && songDelete.rowCount > 0;
  }
}
