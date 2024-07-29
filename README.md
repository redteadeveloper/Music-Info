# music-info

![NPM](https://img.shields.io/npm/l/music-info?style=flat-square)
![NPM](https://img.shields.io/codacy/grade/0101b6a8532240be96430ccc83c573e5?style=flat-square)
![NPM](https://img.shields.io/npm/dt/music-info?style=flat-square) 
![NPM](https://img.shields.io/npm/v/music-info?style=flat-square)
![NPM](https://img.shields.io/bundlephobia/min/music-info?style=flat-square)

NPM module for searching songs and albums.

## Usage

### Searching for Songs

Usage: `searchSong(term, options)`
  - `term<String>`: The term you want to search up for.
  - `options<Object>`: **Optional;** Option for specifying details of the song.
    - `artist<String>`: The artist name of the song you are searching for.
    - `album<String>`: The album title of the song you are searching for.

**Tip**: To fetch an artwork URL or release date, use `searchAlbum` instead.

<details><summary>Click to see the returned object (promise)</summary>
<p>

```js
{
  type: 'song',
  title: String, // title of the song
  artist: String, // artist of the song
  album: String, // title of the album
  genre: String, // genre of the song
  trackNumber: Number, // track number of the song
  trackLength: Number, // length of the track in milliseconds
  available: Boolean, // availability on iTunes
  explicit: Boolean
}
```

</p>
</details>

### Searching for Albums

Usage: `searchAlbum(term, options)`
  - `term<String>`: The term you want to search up for.
  - `options<Object>`: **Optional;** Option for specifying details of the album & artwork size.
    - `artist<String>`: The artist name of the album you are searching for.
    - `artworkSize<Number>`: The artwork size you want to get. Default value is `60`.

<details><summary>Click to see the returned object (promise)</summary>
<p>
  
```js
{
  type: 'album',
  title: String,
  artist: String,
  trackCount: Number,
  genre: String,
  releaseDate: Date,
  explicit: Boolean,
  artwork: String
}
```

</p>
</details>

### Searching for Lyrics

To be added later.