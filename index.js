const fetch = require('node-fetch')

class musicInfo {
    constructor(name, code) {
        this.name = name;
        this.code = code;
    }
}

exports.searchSong = async ({ title: title, artist: artist, album: album }) => {

    if(!title) throw new TypeError("missing parameter: title")

    artist = typeof artist !== 'undefined' ? `+${artist}` : "";
    album = typeof album !== 'undefined' ? `+${album}` : "";

    let searchData = await fetch(encodeURI(`https://itunes.apple.com/search?term=${title}${artist}${album}&limit=1&entity=song`))
    let res = await searchData.json()
    if (res.resultCount == 0) {
        throw new Error("No result.")
    }

    let result = {
        title: res.results[0].trackName,
        artist: res.results[0].artistName,
        album: res.results[0].collectionName,
        discNumber: res.results[0].discNumber,
        trackNumber: res.results[0].trackNumber,
        explicit: res.results[0].trackExplicitness == "notExplicit" ? false : true,
        releaseDate: res.results[0].releaseDate,
        genre: res.results[0].primaryGenreName,
        country: res.results[0].country
    }

    return result

}

exports.searchAlbum = async ({ name: name, artist: artist }) => {

    if(!name) throw new TypeError("missing parameter: name")

    artist = typeof artist !== 'undefined' ? `+${artist}` : "";

    let searchData = await fetch(encodeURI(`https://itunes.apple.com/search?term=${name}${artist}&limit=1&entity=album`))
    let res = await searchData.json()
    if (res.resultCount == 0) {
        throw new Error("No result.")
    }

    let result = {
        name: res.results[0].collectionName,
        artist: res.results[0].artistName,
        trackCount: res.results[0].trackCount,
        explicit: res.results[0].collectionExplicitness == "notExplicit" ? false : true,
        contentAdvisoryRating: res.results[0].contentAdvisoryRating ? res.results[0].contentAdvisoryRating : null,
        releaseDate: res.results[0].releaseDate,
        genre: res.results[0].primaryGenreName,
        country: res.results[0].country
    }

    return result

}