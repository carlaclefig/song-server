import { Song } from "../models/song";

export interface SongRepository {
  findAll(): Promise<Song[]>;
  findById(id: number): Promise<Song | null>;
  save(song: Song): Promise<Song>;
  update(song: Song): Promise<Song>;
  delete(id: number): Promise<boolean>;
}
