export interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  year: number;
  genre: string;
}

export interface SongsData {
  songs: Song[];
}

export interface CreateSongDTO {
  title: string;
  artist: string;
  album: string;
  year: number;
  genre: string;
}

export type ReplaceSongDTO = CreateSongDTO;

export interface UpdateSongDTO {
  title?: string;
  artist?: string;
  album?: string;
  year?: number;
  genre?: string;
}

export interface ApiSuccessResponse<T> {
  ok: true;
  data: T;
}

export interface ApiErrorResponse {
  error: true;
  message: string;
}
