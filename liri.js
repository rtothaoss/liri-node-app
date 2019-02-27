require("dotenv").config();
var axios = require("axios");
var moment = require('moment');
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var fs = require('fs')



var spotify = new Spotify(keys.spotify);

var action = process.argv[2];

var rawInput = process.argv.slice(3)

var input = rawInput.join(' ')

var divider = "\n------------------------------------------------------------\n\n";




//-----------OMDB----------//
//-----------OMDB----------//
function OMDB(input) {
    axios.get("http://www.omdbapi.com/?t=" + input + "&apikey=trilogy")
        .then(function (response) {

            var showData = [response.data.Title,
            response.data.Year,
            response.data.imdbRating,
            response.data.Ratings[1].Source + ': ' + response.data.Ratings[1].Value,
            response.data.Country,
            response.data.Language,
            response.data.Plot,
            response.data.Actors].join('\n\n');

            console.log(showData)

            append(showData)
        }
        );
};

//-----------BandsInTown----------//
//-----------BandsInTown----------//
function BandsInTown(input) {
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp")
        .then(function (response) {
            for (var i = 0; i < response.data.length; i++) {

                var date = response.data[i].datetime

                var showData = [response.data[i].venue.name,
                response.data[i].venue.city + ', ' + response.data[i].venue.country,
                moment(date).format('MM-DD-YYYY'),
                    '-----------------'].join('\n\n')

                console.log(showData)
                append(showData)
            }

        })
}

//-----------Spotify----------//
//-----------Spotify----------//
function spotifySong(input) {
    spotify.search({ type: 'track', query: input, limit: 5 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        for (var x = 0; x < data.tracks.items.length; x++) {

            var showData = [data.tracks.items[x].album.artists[0].name,
            data.tracks.items[x].name,
            data.tracks.items[x].preview_url,
            data.tracks.items[x].album.name,
                '-----------------'].join('\n\n')

            console.log(showData)

            append(showData)
        }

    });

};

//-----------FileSystem----------//
//-----------FileSystem----------//
function fileSystem() {
    fs.readFile('./random.txt', 'utf8', (err, data) => {
        if (err) throw err;

        var newData = data.split(',')


        if (newData[0] === 'concert-this') {
            BandsInTown(newData[1].replace(/['"]+/g, ''));
        } else if (newData[0] === 'spotify-this-song') {
            spotifySong(newData[1])
        } else if (newData[0] === 'movie-this') {
            OMDB(newData[1])
        } else {
            console.log('Make sure you have everything formatted correctly')
        }

    });
}
//-----------Append File----------//
//-----------Append File----------//

function append(showData) {
    fs.appendFile("log.txt", showData + divider, function (err) {
        if (err) throw err;

    });
}


//-----------If/Else Statements----------//
//-----------If/Else Statements----------//
switch (action) {
    case 'concert-this':
        var artist = input || 'Sylvan Esso';
        BandsInTown(artist);
        break;

    case 'spotify-this-song':
        var song = input || 'Self Care'
        spotifySong(song)
        break;

    case 'movie-this':
        var movie = input || 'Mr Nobody'
        OMDB(movie);
        break;

    case 'do-what-it-says':
        fileSystem();
        break;

    default:
        console.log('Type in a command like "concert-this" followed by a band name.')
        break;
        
}





