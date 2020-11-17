
// Initial array of movies
var movies = [];
var actors = [];
var actorsList = [];
var nationality = [];
var count = 0;
var name;

var inputEl = $("#movie-input");


// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayMovieInfo(event) {

    event.preventDefault();

    // var movie = $(this).attr("data-name");
    var movie = $("#movie-input").val().trim();
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=4829e09f";
    console.log(movie);

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        // Creating a div to hold the movie
        var movieDiv = $("<div class='movie'>");
        actorsList = response.Actors;
        console.log(actorsList);
        // Storing the rating data
        var actors = response.Actors.split(",");
        console.log(actors);
        console.log(actors[0].split(' ')[0]);
        name = actors[0].split(' ')[0];

        // Creating an element to have the rating displayed
        var pOne = $("<div id='actors-view'></div>").text("Actors: " + actors);
        // Displaying the rating
        movieDiv.append(pOne);


        for (var i = 0; i < actors.length; i++) {
            console.log(actors[i]);
            var p2 = $("<button>").text(actors[i]);
            movieDiv.append(p2);
        }

        // Displaying the rating
        movieDiv.append(pOne);

        // Storing the release year
        var director = response.Director.split(",");

        // Creating an element to hold the release year
        var pTwo = $("<p>").text("Director(s): " + director);

        // Displaying the release year
        movieDiv.append(pTwo);

        // Storing the plot
        var writer = response.Writer.split(",");

        // Creating an element to hold the plot
        var pThree = $("<p>").text("Writer(s): " + writer);

        // Appending the plot
        movieDiv.append(pThree);

        // Retrieving the URL for the image
        var imgURL = response.Poster;

        // Creating an element to hold the image
        var image = $("<img>").attr("src", imgURL);

        // Appending the image
        movieDiv.append(image);

        // Putting the entire movie above the previous movies
        $("#movies-view").append(movieDiv);

        checkNationality(name);

    });

}


function checkNationality() {
    // var movie = $(this).attr("data-name");

    console.log(actorsList);

    var name = "Michael";


    // var name = actors[0].split(' ')[0];
    var queryURL = "https://api.nationalize.io?name=" + name;

    var nationDiv = $("<div class='nation'>");

    console.log(name);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var countries = response.country;

        console.log(response);

        var pOne = $("<div id='nation-view'></div>").text("The name: " + name + " is from the following countries:");
        // Displaying the rating
        nationDiv.append(pOne);



        for (let i = 0; i < countries.length; i++) {

            // const element = array[index];
            console.log(countries[i].country_id);

            var pOne = $("<div id='nation-view'></div>").text(countries[i].country_id + " with a probability of " + ((countries[i].probability) * 100).toFixed(2) + "%");
            // Displaying the rating
            nationDiv.append(pOne);

            $("#nation-view").append(nationDiv);

        }


        // console.log(response.country[0]);

        // console.log(countries);

        // Creating an element to have the rating displayed



    });
}




// Adding a click event listener to all elements with a class of "movie-btn"

inputEl.keyup(function (e) {
    if (e.which === 13) {
        e.preventDefault();
        // $('form').submit();
        displayMovieInfo(event);
    }
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", "#add-movie", displayMovieInfo);
