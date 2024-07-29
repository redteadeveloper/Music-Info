import fetch from 'node-fetch';
import { SongInfo, AlbumInfo } from './types';
import { SongSearchOptions, AlbumSearchOptions } from './types'

async function getSearchResult(term: string, type: 'song' | 'album'): Promise<any[]> {
  const searchURI: string = encodeURI(`https://itunes.apple.com/search?media=music&attribute=${type}Term&term=${term}&entity=${type}&limit=10`);
  let searchResult: any[] = (await (await fetch(searchURI)).json()).results;

  if (!searchResult[0]) throw new Error(`no result for: ${term}`);

  return searchResult;
}

async function searchSong(term: string, { artist, album }: SongSearchOptions = {}): Promise<SongInfo[]> {
  let searchResult: any[] = await getSearchResult(term, 'song');

  if (album) searchResult = searchResult.filter(({ collectionName }) => collectionName.toLowerCase().includes(album.toLowerCase()));
  if (artist) searchResult = searchResult.filter(({ artistName }) => artistName.toLowerCase().includes(artist.toLowerCase()));

  return searchResult.map((data: any): SongInfo => ({
    type: 'song',
    title: data.trackName,
    artist: data.artistName,
    album: data.collectionName,
    genre: data.primaryGenreName,
    trackNumber: data.trackNumber,
    trackLength: data.trackTimeMillis,
    available: data.isStreamable,
    explicit: !data.trackExplicitness.includes('not')
  }));
}

async function searchAlbum(term: string, { artist, artworkSize = 60 }: AlbumSearchOptions = {}): Promise<AlbumInfo[]> {
  let searchResult = await getSearchResult(term, 'album');

  if (artist) searchResult = searchResult.filter(({ artistName }) => artistName.toLowerCase().includes(artist.toLowerCase()));

  return searchResult.map((data: any): AlbumInfo => ({
    type: 'album',
    title: data.collectionName,
    trackCount: data.trackCount,
    artist: data.artistName,
    genre: data.primaryGenreName,
    releaseDate: new Date(data.releaseDate),
    explicit: !data.trackExplicitness.includes('not'),
    artwork: data.artworkUrl100.replace(/100x100/, `${artworkSize}x${artworkSize}`)
  }));
}


export { searchSong, searchAlbum };