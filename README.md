# Music-Info

[![NPM](https://nodei.co/npm/music-info.png)](https://npmjs.org/package/music-info)

npm module for searching songs and albums.

## Usage

### Song search
```js
let musicInfo = require("music-info");

musicInfo.searchSong({ title: "November Rain", artist: "Guns N Roses", album: "Use Your Illusion I" }).then(console.log);
```
``artist`` and ``album`` parameters are optional.

### Album search
```js
let musicInfo = require("music-info");

musicInfo.searchAlbum({ name: "Appetite For Destruction", artist: "Guns N Roses" }).then(console.log);
```
``artist`` parameter is optional.

### Lyrics search
```js
let musicInfo = require("music-info");

musicInfo.searchLyrics({ title: "Since I Don't Have You", artist: "Guns N Roses" }).then(console.log);
```
``artist`` parameter is optional.
