import fetch from 'node-fetch';

export async function search(term, { type = 'all', artworkSize = 600, length = 3 } = {}) {

  const format = {
    song: (data) => {
      const trackLength = new Date(data.trackTimeMillis);
      return {
        type: 'song',
        title: data.trackName,
        artist: data.artistName,
        available: data.isStreamable, // on apple music
        explicit: data.trackExplicitness.includes('not') ? false : true,
        length: `${trackLength.getMinutes()}:${trackLength.getSeconds()}`,
        album: format.album(data)
      };
    },
    album: (data) => ({
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

  if (!term) throw new TypeError('missing parameter: term');
  if (!['song', 'album', 'all'].includes(type)) throw new TypeError('invalid type: only [ song, album, all ] is allowed'); // 

  const attribute = type === 'all' ? '' : `${type}Term`;
  const entity = type === 'all' ? '' : type;
  const searchURI = encodeURI(`https://itunes.apple.com/search?media=music&limit=${length}&attribute=${attribute}&term=${term}&entity=${entity}`);
  const searchData = (await (await fetch(searchURI))?.json()).results;
  
  if (!searchData[0]) throw new Error(`no result for: ${term}`);

  if (type === 'all') {
    return searchData.map(data => {
      switch (data.wrapperType) {
        case 'track': return format.song(data);
        case 'album': return format.album(data);
        default: return;
      }
    });
  } else return searchData.map(format[type]);

}

export async function getLyrics({ title, artist }) {

  if(!title) throw new TypeError("missing parameter: title");

  let lyricsData = await (await fetch(encodeURI(`https://some-random-api.ml/lyrics/?title=${title}${artist ? `-${artist}` : ''}`))).json();

  if (lyricsData.error) throw new Error(`no result for: ${title}`);

  return {
    url: Object.values(lyricsData.links)[0],
    lyrics: lyricsData.lyrics
  };

};