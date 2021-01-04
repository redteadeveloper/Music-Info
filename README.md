# Music-Info
Npm module for getting music info.

## Examples
```js
let musicInfo = require("music-info")

musicInfo.searchSong({ title: "November Rain", artist: "Guns N Roses", album: "Use Your Illusion I" }).then(console.log)
```
``artist`` and ``album`` parameters are optional.
