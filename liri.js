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





//-----------OMDB----------//
//-----------OMDB----------//
function OMDB(input) {
    axios.get("http://www.omdbapi.com/?t=" + input + "&apikey=trilogy")
    .then(function (response) {
            
            console.log(response.data.Title);
            console.log(response.data.Year);
            console.log(response.data.imdbRating);
            console.log(response.data.Ratings[1]);
            console.log(response.data.Country);
            console.log(response.data.Language);
            console.log(response.data.Plot);
            console.log(response.data.Actors);
        }
    );
};

//-----------BandsInTown----------//
//-----------BandsInTown----------//
function BandsInTown(input) {
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp")
    .then(function(response){
        for(var i = 0; i < response.data.length; i++) {
            console.log(response.data[i].venue.name)
            console.log(response.data[i].venue.city + ', ' + response.data[i].venue.country)
            var date = response.data[i].datetime;
            console.log(moment(date).format('MM-DD-YYYY'))
            console.log('-----------------')
            console.log(input)

        }

    })
}

//-----------Spotify----------//
//-----------Spotify----------//
function spotifySong(input) {
    spotify.search({ type: 'track', query: input, limit: 5 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }

        for(var x = 0; x < data.tracks.items.length; x++) {
            console.log(data.tracks.items[x].album.artists[0].name); 
            console.log(data.tracks.items[x].name); 
            console.log(data.tracks.items[x].preview_url); 
            console.log(data.tracks.items[x].album.name);
            console.log('-----------------') 
        }
     
      });

};

//-----------FileSystem----------//
//-----------FileSystem----------//
function fileSystem() {
    fs.readFile('./random.txt','utf8', (err, data) => {
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


//-----------If/Else Statements----------//
//-----------If/Else Statements----------//
if (action === 'concert-this') {
    
    if (input.length === 0) {

        BandsInTown('Sylvan Esso');
    } else {

        BandsInTown(input);
    }

} else if (action === 'spotify-this-song') {

        if (input.length === 0) {

            spotifySong('Self Care')
        } else {
            
            spotifySong(input)
        }


} else if (action === 'movie-this') {

    if (input.length === 0) {

        OMDB('Mr Nobody');
    } else {

        OMDB(input);
    }

} else if (action === 'do-what-it-says') {
    
    fileSystem();

}





