// require("dotenv").config();
var axios = require("axios");
// var keys = require("./keys.js");


var action = process.argv[2];

var input = process.argv.slice(3)

console.log(input)



//-----------OMDB----------//
//-----------OMDB----------//
function OMDB(input) {
    axios.get("http://www.omdbapi.com/?t=" + input + "&apikey=trilogy").then(
        function (response) {
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

if (action === 'concert-this') {


} else if (action === 'spotify-this-song') {


} else if (action === 'movie-this') {
    
    if (input.length === 0) {
 
        OMDB('Mr Nobody');
    } else {

        OMDB(input);
    }
  
} else if (action === 'do-what-it-says') {


}

