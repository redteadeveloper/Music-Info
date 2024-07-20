import fetch from 'node-fetch';

enum SearchType {
  All = 'all',
  Song = 'song',
  Album = 'album'
};

interface SearchOptions {
  type?: SearchType,
  artworkSize?: number,
  length?: number
};

interface SongInfo {
  type: 'song',
  title: string,
  artist: string,
  available: boolean,
  explicit: boolean,
  length: string,
  // trackNumber: number,
  album: AlbumInfo
};

interface AlbumInfo {
  type: 'album',
  title: string,
  trackCount: number,
  artist: string,
  genre: string,
  releaseDate: Date,
  explicit: boolean,
  artwork: string
};

type SearchResult = Array<SongInfo | AlbumInfo | null> | null;

export async function search(term: string, { type = SearchType.All, artworkSize = 600, length = 3 }: SearchOptions = {}): Promise<SearchResult> {
  const format = {
    [SearchType.Song]: (data: any): SongInfo => {
      const trackLength = new Date(data.trackTimeMillis);
      return {
        type: 'song',
        title: data.trackName,
        artist: data.artistName,
        available: data.isStreamable,
        explicit: data.trackExplicitness.includes('not') ? false : true,
        length: `${trackLength.getMinutes()}:${trackLength.getSeconds()}`,
        album: format.album(data)
      }
    },
    [SearchType.Album]: (data: any): AlbumInfo => ({
      type: 'album',
      title: data.collectionName,
      trackCount: data.trackCount,
      artist: data.artistName,
      genre: data.primaryGenreName,
      releaseDate: new Date(data.releaseDate),
      explicit: data.collectionExplicitness.includes('not') ? false : true,
      artwork: data.artworkUrl100.replace(/100x100/, `${artworkSize}x${artworkSize}`)
    })
  }

  const attribute: string = type === 'all' ? '' : `${type}Term`;
  const entity: string = type === 'all' ? '' : type;
  const searchURI: string = encodeURI(`https://itunes.apple.com/search?media=music&limit=${length}&attribute=${attribute}&term=${term}&entity=${entity}`);
  const searchData: Array<Object> = (await (await fetch(searchURI))?.json()).results;
  
  if (!searchData[0]) throw new Error(`no result for: ${term}`);

  if (type === SearchType.All) {
    return searchData.map((data: any) => {
      switch (data.wrapperType) {
        case 'track': return format.song(data);
        case 'album': return format.album(data);
        default: return null;
      }
    });
  } else if (type === SearchType.Song) {
    return searchData.map(format.song);
  } else if (type === SearchType.Album) {
    return searchData.map(format.album);
  }

  return null;
}