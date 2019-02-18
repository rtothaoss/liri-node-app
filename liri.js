// require("dotenv").config();
var axios = require("axios");
// var keys = require("./keys.js");


var action = process.argv[2];

var rawInput = process.argv.slice(3)

var input = rawInput.join(' ')




//-----------OMDB----------//
//-----------OMDB----------//
function OMDB(input) {
    axios.get("http://www.omdbapi.com/?t=" + input + "&apikey=trilogy")
    .then(function (response) {
            // Then we print out the imdbRating
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
            console.log(response.data[i].datetime)
            console.log('-----------------')

        }
        // console.log(response.data[0].venue.name)
    })
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





} else if (action === 'movie-this') {

    if (input.length === 0) {

        OMDB('Mr Nobody');
    } else {

        OMDB(input);
    }

} else if (action === 'do-what-it-says') {


}

