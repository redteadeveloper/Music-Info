# Music-Info
npm module for searching music and album.

## Usage

### Song search
```js
let musicInfo = require("music-info")

musicInfo.searchSong({ title: "November Rain", artist: "Guns N Roses", album: "Use Your Illusion I" }).then(console.log)
```
``artist`` and ``album`` parameters are optional.

### Album search

In development
