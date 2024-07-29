interface SongSearchOptions {
  artist?: string,
  album?: string
}

interface AlbumSearchOptions {
  artist?: string,
  artworkSize?: number
}

interface SongInfo {
  type: 'song',
  title: string,
  artist: string,
  album: string
  genre: string,
  available: boolean,
  explicit: boolean,
  trackLength: number,
  trackNumber: number,
}

interface AlbumInfo {
  type: 'album',
  title: string,
  trackCount: number,
  artist: string,
  genre: string,
  releaseDate: Date,
  explicit: boolean,
  artwork: string
}

export { SongInfo, AlbumInfo, SongSearchOptions, AlbumSearchOptions }