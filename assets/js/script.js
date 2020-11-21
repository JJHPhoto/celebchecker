// // ********** Initializing global variables ************************
var movies = [];
var movie;
var actors = [];
var nationality = [];
var count = 0;
var name;
var country;

// // ********** Retrieving Info from Local Storage ************************
var localStorageCont = JSON.parse(localStorage.getItem("movies_list"));
if (localStorageCont === null) {
  movies = [];
} else {
  movies = localStorageCont;
  movie = movies[movies.length - 1];
}

var inputEl = $("#movie-input");

// // ********** Re-rendering of the HTML to display the appropriate content ************************
function displayMovieInfo(movie) {
  $("#movies-view").empty();
  $("#movies-poster").empty();
  var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=4829e09f";
  console.log(movie);

  // // ********** Creating an AJAX call for the specific movie button being clicked ***********************
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {

    var movieDiv = $("<div class='movie'>");
    var actors = response.Actors.split(",");
    console.log(actors);
    console.log(actors[0].split(" ")[0]);
    name = actors[0].split(" ")[0];

    var pOne = $("<div id='actors-view'></div>").text("Actors: ");
    movieDiv.append(pOne);

    var actorDiv = $("<div class='actors'>");

    for (var i = 0; i < actors.length; i++) {

      var a = $(
        "<button>"
      );
      var p2 = a.text(actors[i]);
      p2.addClass("name button has-background-primary has-text-primary-light");
      p2.attr("data-name", actors[i]);
      actorDiv.append(p2);
    }

    movieDiv.append(actorDiv);


    var director = response.Director.split(",");
    var pTwo = $("<p>").text("Director(s): ");
    movieDiv.append(pTwo);
    var directorDiv = $("<div class='directors'>");
    for (var i = 0; i < director.length; i++) {
      var d1 = $(
        "<button>"
      ).text(director[i]);
      d1.addClass("name button has-background-primary has-text-primary-light");
      d1.attr("data-name", director[i]); 
      directorDiv.append(d1);
    }

    movieDiv.append(directorDiv);

    var writer = response.Writer.split(",");
    var pThree = $("<p>").text("Writer(s): ");
    movieDiv.append(pThree);

    var writerDiv = $("<div class='writers'>");
    for (var i = 0; i < writer.length; i++) {
      var w1 = $(
        "<button>"
      ).text(writer[i]);
      w1.addClass("name button has-background-primary has-text-primary-light");
      w1.attr("data-name", writer[i]);
      writerDiv.append(w1);
    }

    movieDiv.append(writerDiv);


    var imgURL = response.Poster;
    var image = $("<img>").attr("src", imgURL);
    $("#movies-poster").append(image);
    $("#movies-view").append(movieDiv);


  });
}

// // ********** Checking nationality of the selected name *****************
function checkNationality(name) {
  $("#nation-view").empty();
  var queryURL = "https://api.nationalize.io?name=" + name;

  var nationDiv = $("<div class='nation'>");

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var countries = response.country;
    
    var pOne;
  
    

    if (countries.length === 0) {
      pOne = $("<div id='nation-view'></div>").text(
        "The name " + name + " is not in the database.")
        nationDiv.append(pOne);
      } else {

      pOne = $("<div id='nation-view'></div>").html(`The name <b>${name}</b> is from the following countries:`)

      

      nationDiv.append(pOne);
      for (let i = 0; i < countries.length; i++) {
        country = getCountryName(countries[i].country_id);
        var pOneOne = $("<div id='nation-view'></div>").text(
          country +
            " with a probability of " +
            (countries[i].probability * 100).toFixed(2) +
            "%"
        ); 
        nationDiv.append(pOneOne);
        }  
        
      };


    $("#nation-view").append(nationDiv);

  });
}

// // ********** Submit by clicking enter button *****************
var inputEl = $("#movie-input");

inputEl.keyup(function (e) {
  if (e.which === 13) {
    e.preventDefault();
    movie = $("#movie-input").val().toUpperCase().trim();

    if (movie.length == 0 ) {
      return false; }

    if (movies.indexOf(movie) === -1) {
      movies.push(movie);
    }
    localStorage.setItem("movies_list", JSON.stringify(movies));
    displayMovieInfo(movie);
  renderMovieSearchButtons();

  }
});

// // ********** Select the name to check nationality *****************
function savedActorClick(event) {
  event.preventDefault();
  var fullname = $(this).attr("data-name");

  var newName = fullname.trim().split(",")[0];
  var newnewName = newName.split(" ")[0];

  checkNationality(newnewName);
}

// // ********** Conversion of the country from two letters to the full name *****************
function getCountryName(countryCode) {
  if (isoCountries.hasOwnProperty(countryCode)) {
    return isoCountries[countryCode];
  } else {
    return countryCode;
  }
}
// // ********** Rendering of the searched movies buttons *****************
function renderMovieSearchButtons() {
  $("#movies-search").empty();
  for (var i = 0; i < movies.length; i++) {
    var a = $("<button>");
    a.addClass("movie button has-background-primary has-text-primary-light");
    a.attr("data-name", movies[i]);
    a.text(movies[i]);
    var linebreak = $("<br>");
    $("#movies-search").prepend(a, linebreak);
  }
}

// // ********** Calling the renderButtons function to display the search history buttons *****************
renderMovieSearchButtons();

// // ********** Displaying movies from the searched movies buttons *****************
function savedMovieClick(event) {
  event.preventDefault();
  movie = $(this).text();

  displayMovieInfo(movie);
}

// // ********** Adding click event listeners to all elements with a class of "movie" *****************
$("#movies-search").on("click", ".movie", savedMovieClick);

// // ********** Adding click event listeners to all elements with a class of "name" ****************
$(document).on("click", ".name", savedActorClick);


// // ********** Adding click event listeners to search button ****************
$("#add-movie").on("click", function (event) {
  event.preventDefault();
  movie = $("#movie-input").val().toUpperCase().trim();
  if (movie.length == 0 ) {
    return false; }

  if (movies.indexOf(movie) === -1) {
    movies.push(movie);
  }
  localStorage.setItem("movies_list", JSON.stringify(movies));
  displayMovieInfo(movie);

  renderMovieSearchButtons();
});
