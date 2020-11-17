// Initial array of movies
var movies = [];
var actors = [];
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
    method: "GET",
  }).then(function (response) {
    console.log(response);

    // Creating a div to hold the movie
    var movieDiv = $("<div class='movie'>");
    var actors = response.Actors.split(",");
    console.log(actors);
    console.log(actors[0].split(" ")[0]);
    name = actors[0].split(" ")[0];

    // Creating an element to have the rating displayed
    var pOne = $("<div id='actors-view'></div>").text("Actors: " + actors);
    // Displaying the rating
    movieDiv.append(pOne);

    var actorDiv = $("<div class='actors'>");

    for (var i = 0; i < actors.length; i++) {
      console.log(actors[i]);
      var a = $("<button>");
      var p2 = a.text(actors[i]);
      p2.addClass("actor");
      p2.attr("data-name", actors[i]);
      console.log(p2);
      actorDiv.append(p2);
    }

    movieDiv.append(actorDiv);

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

function checkNationality(name) {
  var queryURL = "https://api.nationalize.io?name=" + name;

  var nationDiv = $("<div class='nation'>");

  console.log(name);
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var countries = response.country;

    console.log(response);

    var pOne = $("<div id='nation-view'></div>").text(
      "The name: " + name + " is from the following countries:"
    );
    nationDiv.append(pOne);

    for (let i = 0; i < countries.length; i++) {
      console.log(countries[i].country_id);
      var pOne = $("<div id='nation-view'></div>").text(
        countries[i].country_id +
          " with a probability of " +
          (countries[i].probability * 100).toFixed(2) +
          "%"
      );
      nationDiv.append(pOne);
      $("#nation-view").append(nationDiv);
    }
  });
}

// Submit input with Enter Key

var inputEl = $("#movie-input");

inputEl.keyup(function (e) {
  if (e.which === 13) {
    e.preventDefault();
    // $('form').submit();
    displayMovieInfo(event);
  }
});

function savedActorClick(event) {
  event.preventDefault();
  var fullname = $(this).attr("data-name");
  console.log("Button value:" + fullname);
  // var name = $("#movie-input").val().trim();
  // var fullname = event.target.button;
  // var fullname = event.target.matches(".actor");
 
  var newName = fullname.split(",")[0];
  var newnewName = newName.split(" ")[0];
  console.log("from new function: " + newnewName);
  // checkNationality(newName);
}
// Adding a click event listener to all elements with a class of "movie-btn"

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", "#add-movie", displayMovieInfo);

// Adding click event listeners to all elements with a class of "city"
$(document).on("click", ".actor", savedActorClick);
