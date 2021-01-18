# music-info

![NPM](https://img.shields.io/npm/l/music-info?style=flat-square)
![NPM](https://img.shields.io/codacy/grade/0101b6a8532240be96430ccc83c573e5?style=flat-square)
![NPM](https://img.shields.io/npm/dt/music-info?style=flat-square) 
![NPM](https://img.shields.io/npm/v/music-info?style=flat-square)
![NPM](https://img.shields.io/bundlephobia/min/music-info?style=flat-square)

npm module for searching songs and albums.

## Usage

### Song search
```js
let musicInfo = require("music-info");

musicInfo.searchSong({ title: "November Rain", artist: "Guns N Roses", album: "Use Your Illusion I" }, 1000).then(console.log);
```
* ``1000`` is the size of the artwork. Default value is 600.
* ``artist`` and ``album`` parameters are optional.

<details><summary>Click to see the returned object (promise)</summary>
<p>
  
```js
{
  title: String,      
  artist: String,
  album: String,
  discNumber: Number,
  trackNumber: Number,
  explicit: Boolean,
  releaseDate: String,
  genre: String,
  lengthMilliSec: Number,
  artwork: String
}
```

</p>
</details>

### Album search
```js
let musicInfo = require("music-info");

musicInfo.searchAlbum({ name: "Appetite For Destruction", artist: "Guns N Roses" }, 1000).then(console.log);
```
* ``1000`` is the size of the artwork. Default value is 600.
* ``artist`` parameter is optional.

<details><summary>Click to see the returned object (promise)</summary>
<p>
  
```js
{
  name: String,
  artist: String,
  trackCount: Number,
  explicit: Boolean,
  contentAdvisoryRating: String,
  releaseDate: String,
  genre: String,
  artwork: String
}
```

</p>
</details>

### Lyrics search
```js
let musicInfo = require("music-info");

musicInfo.searchLyrics({ title: "Since I Don't Have You", artist: "Guns N Roses" }).then(console.log);
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
