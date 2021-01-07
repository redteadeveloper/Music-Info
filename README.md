# music-info

![NPM](https://img.shields.io/npm/l/music-info?style=flat-square)
![NPM](https://img.shields.io/github/issues/redteadeveloper/Music-Info?style=flat-square)
![NPM](https://img.shields.io/github/issues-pr/redteadeveloper/Music-Info?style=flat-square)
![NPM](https://img.shields.io/npm/dt/music-info?style=flat-square) 
![NPM](https://img.shields.io/bundlephobia/min/music-info?style=flat-square)

npm module for searching songs and albums.

## Usage

### Song search
```js
let musicInfo = require("music-info");

musicInfo.searchSong({ title: "November Rain", artist: "Guns N Roses", album: "Use Your Illusion I" }, 1000).then(console.log);
```
* ``1000`` is the size of the artwork.
* ``artist`` and ``album`` parameters are optional.

### Album search
```js
let musicInfo = require("music-info");

musicInfo.searchAlbum({ name: "Appetite For Destruction", artist: "Guns N Roses" }, 1000).then(console.log);
```
* ``1000`` is the size of the artwork.
* ``artist`` parameter is optional.

### Lyrics search
```js
let musicInfo = require("music-info");

musicInfo.searchLyrics({ title: "Since I Don't Have You", artist: "Guns N Roses" }).then(console.log);
```
* ``artist`` parameter is optional.
