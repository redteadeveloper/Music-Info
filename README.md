# music-info

![NPM](https://img.shields.io/npm/l/music-info?style=flat-square)
![NPM](https://img.shields.io/codacy/grade/0101b6a8532240be96430ccc83c573e5?style=flat-square)
![NPM](https://img.shields.io/npm/dt/music-info?style=flat-square) 
![NPM](https://img.shields.io/npm/v/music-info?style=flat-square)
![NPM](https://img.shields.io/bundlephobia/min/music-info?style=flat-square)

npm module for searching songs and albums.

## Usage

### Parameters

- **`term<String>`**: The term you want to search up for.
- **`option<Object>`**: Object for additional options when searching up.
  - `type<String>`: `all` | `song` | `album`
    - The type of media you want to search up for. Default is `all`.
  - `artworkSize<Number>`: Size of the artwork. Default is `600`.
  - `length<Number>`: The number of results you want to get. Default is `3`.

### Overall search

Don't pass any configuration in order to search for anything that matches the search keyword.
Or you can set the `type` to `all` in order to achieve the same result.

```js
const musicInfo = require('music-info');

musicInfo.search("I'm not the only one").then(console.log);
```

### Song search

```js
const musicInfo = require('music-info');

musicInfo.search('November Rain', { type: 'song', artworkSize: 1000 }).then(console.log);

```
* ``1000`` is the size of the artwork. Default value is 600.
* ``artist`` and ``album`` parameters are optional.

<details><summary>Click to see the returned object (promise)</summary>
<p>
  
```js
{
  type: 'song',
  title: String, // title of the song
  artist: String, // artist of the song
  available: Boolean, // on iTunes
  explicit: Boolean,
  length: String, // ex. 3:30 for 3 minutes 30 seconds long
  album: { // info of the album
    type: 'album',
    title: String, // title of the album
    artist: String, // artist of the album
    trackCount: Number,
    genre: String,
    releaseDate: Date,
    explicit: Boolean,
    artwork: String
  }
}
```

</p>
</details>

### Album search
```js
const musicInfo = require('music-info');

musicInfo.search('appetite for destruction', { type: 'album' }).then(console.log);
```
* ``1000`` is the size of the artwork. Default value is 600.
* ``artist`` parameter is optional.

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

### Lyrics search
```js
const musicInfo = require("music-info");

musicInfo.getLyrics("since i don't have you", { artist: 'Guns N Roses' }).then(console.log);
```
* ``artist`` parameter is optional.

<details><summary>Click to see the returned object (promise)</summary>
<p>
  
```js
{
  url: String,
  lyrics: String
}
```

</p>
</details>
