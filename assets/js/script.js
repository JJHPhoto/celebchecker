// Initial array of movies
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
  // displayMovieInfo(movie);
}

var inputEl = $("#movie-input");

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayMovieInfo(movie) {
  // event.preventDefault();
  $("#movies-view").empty();
  $("#movies-poster").empty();

  // var movie = $("#movie-input").val().trim();
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

    var pOne = $("<div id='actors-view'></div>").text("Actors: ");
    movieDiv.append(pOne);

    var actorDiv = $("<div class='actors'>");

    for (var i = 0; i < actors.length; i++) {
      console.log(actors[i]);
      var a = $(
        "<button>"
      );
      var p2 = a.text(actors[i]);
      p2.addClass("name button has-background-primary has-text-primary-light");
      p2.attr("data-name", actors[i]);
      console.log(p2);
      actorDiv.append(p2);
    }

    movieDiv.append(actorDiv);

    // Storing the director's name
    var director = response.Director.split(",");
    var pTwo = $("<p>").text("Director(s): ");
    movieDiv.append(pTwo);
    // // ********** director button ************************
    var directorDiv = $("<div class='directors'>");
    for (var i = 0; i < director.length; i++) {
      var d1 = $(
        "<button>"
      ).text(director[i]);
      d1.addClass("name button has-background-primary has-text-primary-light");
      // add button class here instead  
      d1.attr("data-name", director[i]); 
      directorDiv.append(d1);
    }

    movieDiv.append(directorDiv);

    var writer = response.Writer.split(",");
    var pThree = $("<p>").text("Writer(s): ");
    movieDiv.append(pThree);

    // ********* writer button ********************
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

    // Retrieving the URL for the image
    var imgURL = response.Poster;
    // Creating an element to hold the image
    var image = $("<img>").attr("src", imgURL);
    // Appending the image
    $("#movies-poster").append(image);

    // Putting the entire movie above the previous movies
    $("#movies-view").append(movieDiv);

    // checkNationality(name);
  });
}

function checkNationality(name) {
  $("#nation-view").empty();
  var queryURL = "https://api.nationalize.io?name=" + name;

  var nationDiv = $("<div class='nation'>");

  console.log(name);
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var countries = response.country;
    
    var pOne;
  
    
    
    console.log(countries.length);

    if (countries.length === 0) {
      pOne = $("<div id='nation-view'></div>").text(
        "The name " + name + " is not in the database.")
        nationDiv.append(pOne);
      } else {
      // pOne = $("<div id='nation-view'></div>").text(
      //   "The name " + name + " is from the following countries:"
      // )
      pOne = $("<div id='nation-view'></div>").html(`The name <b>${name}</b> is from the following countries:`)
      //   made name bold 
      

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

// Submit input with Enter Key

var inputEl = $("#movie-input");

inputEl.keyup(function (e) {
  if (e.which === 13) {
    e.preventDefault();
    movie = $("#movie-input").val().toUpperCase().trim();
    // make it uppercase button
    if (movie.length == 0 ) {
      return false; }
    ///// no empty button appear when there is no value in inpit box and clicked 
    if (movies.indexOf(movie) === -1) {
      movies.push(movie);
    }
    localStorage.setItem("movies_list", JSON.stringify(movies));
    displayMovieInfo(movie);
  renderMovieSearchButtons();
  // added  this for rendering buttons with enter key 
  }
});

function savedActorClick(event) {
  event.preventDefault();
  var fullname = $(this).attr("data-name");
  console.log("Button value:" + fullname);
  // var name = $("#movie-input").val().trim();
  // var fullname = event.target.button;
  // var fullname = event.target.matches(".actor");

  console.log("Button value:" + fullname);
  var newName = fullname.trim().split(",")[0];
  var newnewName = newName.split(" ")[0];
  console.log("from new function: " + newnewName); 
  checkNationality(newnewName);
}

function getCountryName(countryCode) {
  if (isoCountries.hasOwnProperty(countryCode)) {
    return isoCountries[countryCode];
  } else {
    return countryCode;
  }
}

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
// Calling the renderButtons function to display the search history buttons
renderMovieSearchButtons();

function savedMovieClick(event) {
  event.preventDefault();
  // movie = $(this).attr("data-name");
  movie = $(this).text();
  console.log(movie);

  displayMovieInfo(movie);
}

// Adding click event listeners to all elements with a class of "movie"
$("#movies-search").on("click", ".movie", savedMovieClick);

// Adding click event listeners to all elements with a class of "city"
$(document).on("click", ".name", savedActorClick);

// Replaced the previous "on-click" event with the new one which displays the
// movie info, adds movie to a search history list and local storage
// $(document).on("click", "#add-movie", displayMovieInfo);
$("#add-movie").on("click", function (event) {
  event.preventDefault();
  movie = $("#movie-input").val().toUpperCase().trim();
  if (movie.length == 0 ) {
    return false; }
  ///// no empty button appear when there is no value in inpit box and clicked 
  if (movies.indexOf(movie) === -1) {
    movies.push(movie);
  }
  localStorage.setItem("movies_list", JSON.stringify(movies));
  displayMovieInfo(movie);

  renderMovieSearchButtons();
});
