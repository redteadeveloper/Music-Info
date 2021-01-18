const fetch = require("node-fetch");

/**
 * Gets song information.
 * @param {object} SearchQuery - Search query
 * @param {string} SearchQuery.title - Title of the song
 * @param {string} [SearchQuery.artist] - Artist of the song
 * @param {string} [SearchQuery.album] - Album of the song
 * @param {number} [size=600] - Size of artwork image (default value is 600)
 * @returns {Promise<object>}
 * @example searchSong({ title: "November Rain", artist: "Guns N Roses", album: "Use Your Illusion I" }, 1000);
 */

exports.searchSong = async ({ title: title, artist: artist, album: album }, size) => {

    if(!title) {
        throw new TypeError("missing parameter: title");
    }

    artist = typeof artist !== "undefined" ? `+${artist}` : "";
    album = typeof album !== "undefined" ? `+${album}` : "";
    size = typeof size !== "undefined" ? size : 600;

    let searchData = await fetch(encodeURI(`https://itunes.apple.com/search?term=${title}${artist}${album}&limit=1&entity=song`));
    let res = await searchData.json();
    if (res.resultCount === 0) {
        throw new Error("No result.");
    }

    let result = {
        title: res.results[0].trackName,
        artist: res.results[0].artistName,
        album: res.results[0].collectionName,
        discNumber: res.results[0].discNumber,
        trackNumber: res.results[0].trackNumber,
        explicit: res.results[0].trackExplicitness === "notExplicit" ? false : true,
        releaseDate: res.results[0].releaseDate,
        genre: res.results[0].primaryGenreName,
        lengthMilliSec: res.results[0].trackTimeMillis,
        artwork: res.results[0].artworkUrl100.replace(/100x100/, `${size}x${size}`)
    };

    return result;

};

/**
 * Gets album information.
 * @param {object} SearchQuery - Search query
 * @param {string} SearchQuery.name - Name of the album
 * @param {string} [SearchQuery.artist] - Artist of the album
 * @param {number} [size=600] - Size of artwork image (default value is 600)
 * @returns {Promise<object>}
 * @example searchAlbum({ name: "Appetite For Destruction", artist: "Guns N Roses" }, 1000);
 */

exports.searchAlbum = async ({ name: name, artist: artist }, size) => {

    if(!name) {
        throw new TypeError("missing parameter: name");
    }

    artist = typeof artist !== "undefined" ? `+${artist}` : "";

    let searchData = await fetch(encodeURI(`https://itunes.apple.com/search?term=${name}${artist}&limit=1&entity=album`));
    let res = await searchData.json();
    if (res.resultCount === 0) {
        throw new Error("No result.");
    }

    let result = {
        name: res.results[0].collectionName,
        artist: res.results[0].artistName,
        trackCount: res.results[0].trackCount,
        explicit: res.results[0].collectionExplicitness === "notExplicit" ? false : true,
        contentAdvisoryRating: res.results[0].contentAdvisoryRating ? res.results[0].contentAdvisoryRating : null,
        releaseDate: res.results[0].releaseDate,
        genre: res.results[0].primaryGenreName,
        artwork: res.results[0].artworkUrl100.replace(/100x100/, `${size}x${size}`)
    };

    return result;

};

/**
 * Gets the lyrics of a song.
 * @param {object} SearchQuery - Search query
 * @param {string} SearchQuery.title - Title of the song
 * @param {string} [SearchQuery.artist] - Artist of the song
 * @returns {Promise<object>}
 * @example searchLyrics({ title: "Since I Don't Have You", artist: "Guns N Roses" });
 */

exports.searchLyrics = async ({ title: title, artist: artist }) => {

    if(!title) {
        throw new TypeError("missing parameter: title");
    }

    artist = typeof artist !== "undefined" ? `-${artist}` : "";

    let lyricsData = await fetch(encodeURI(`https://some-random-api.ml/lyrics/?title=${title}${artist}`));
    let res = await lyricsData.json();

    if (res.error) {
        throw new Error("No result.");
    }

    let result = {
        url: Object.values(res.links)[0],
        lyrics: res.lyrics
    };

    return result;

};