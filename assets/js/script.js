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
if (localStorageCont===null) {
  movies = [];
}
else {
    movies = localStorageCont
    movie = movies[movies.length-1];
    // displayMovieInfo(movie);
}

var inputEl = $("#movie-input");

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayMovieInfo(movie) {
  // event.preventDefault();
  $("#movies-view").empty();


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
        "<button class= 'button has-background-primary has-text-primary-light'>"
      );
      var p2 = a.text(actors[i]);
      p2.addClass("name");
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
    for (var i = 0; i < director.length; i++) {
      var d1 = $(
        "<button class= 'button has-background-primary has-text-primary-light'>"
      ).text(director[i]);
      d1.addClass("name");
      d1.attr("data-name", director[i]);
      movieDiv.append(d1);
    }


    var writer = response.Writer.split(",");
    var pThree = $("<p>").text("Writer(s): ");
    movieDiv.append(pThree);

    // ********* writer button ********************
    for (var i = 0; i < writer.length; i++) {
      var w1 = $(
        "<button class= 'button has-background-primary has-text-primary-light'>"
      ).text(writer[i]);
      w1.addClass("name");
      w1.attr("data-name", writer[i]);
      movieDiv.append(w1);
    }



    // Retrieving the URL for the image
    var imgURL = response.Poster;
    // Creating an element to hold the image
    var image = $("<img>").attr("src", imgURL);
    // Appending the image
    movieDiv.append(image);

    // Putting the entire movie above the previous movies
    $("#movies-view").append(movieDiv);

    // checkNationality(name);
  });
}

function checkNationality(name) {
  $("#nation-view").empty()
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
      country = getCountryName(countries[i].country_id);
      var pOne = $("<div id='nation-view'></div>").text(
        country +
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

  console.log("Button value:" + fullname); 
  var newName = fullname.trim().split(",")[0];
  var newnewName = newName.split(" ")[0];
  console.log("from new function: " + newnewName);
  checkNationality(newnewName);
}



var isoCountries = {
    'AF' : 'Afghanistan',
    'AX' : 'Aland Islands',
    'AL' : 'Albania',
    'DZ' : 'Algeria',
    'AS' : 'American Samoa',
    'AD' : 'Andorra',
    'AO' : 'Angola',
    'AI' : 'Anguilla',
    'AQ' : 'Antarctica',
    'AG' : 'Antigua And Barbuda',
    'AR' : 'Argentina',
    'AM' : 'Armenia',
    'AW' : 'Aruba',
    'AU' : 'Australia',
    'AT' : 'Austria',
    'AZ' : 'Azerbaijan',
    'BS' : 'Bahamas',
    'BH' : 'Bahrain',
    'BD' : 'Bangladesh',
    'BB' : 'Barbados',
    'BY' : 'Belarus',
    'BE' : 'Belgium',
    'BZ' : 'Belize',
    'BJ' : 'Benin',
    'BM' : 'Bermuda',
    'BT' : 'Bhutan',
    'BO' : 'Bolivia',
    'BA' : 'Bosnia And Herzegovina',
    'BW' : 'Botswana',
    'BV' : 'Bouvet Island',
    'BR' : 'Brazil',
    'IO' : 'British Indian Ocean Territory',
    'BN' : 'Brunei Darussalam',
    'BG' : 'Bulgaria',
    'BF' : 'Burkina Faso',
    'BI' : 'Burundi',
    'KH' : 'Cambodia',
    'CM' : 'Cameroon',
    'CA' : 'Canada',
    'CV' : 'Cape Verde',
    'KY' : 'Cayman Islands',
    'CF' : 'Central African Republic',
    'TD' : 'Chad',
    'CL' : 'Chile',
    'CN' : 'China',
    'CX' : 'Christmas Island',
    'CC' : 'Cocos (Keeling) Islands',
    'CO' : 'Colombia',
    'KM' : 'Comoros',
    'CG' : 'Congo',
    'CD' : 'Congo, Democratic Republic',
    'CK' : 'Cook Islands',
    'CR' : 'Costa Rica',
    'CI' : 'Cote D\'Ivoire',
    'HR' : 'Croatia',
    'CU' : 'Cuba',
    'CY' : 'Cyprus',
    'CZ' : 'Czech Republic',
    'DK' : 'Denmark',
    'DJ' : 'Djibouti',
    'DM' : 'Dominica',
    'DO' : 'Dominican Republic',
    'EC' : 'Ecuador',
    'EG' : 'Egypt',
    'SV' : 'El Salvador',
    'GQ' : 'Equatorial Guinea',
    'ER' : 'Eritrea',
    'EE' : 'Estonia',
    'ET' : 'Ethiopia',
    'FK' : 'Falkland Islands (Malvinas)',
    'FO' : 'Faroe Islands',
    'FJ' : 'Fiji',
    'FI' : 'Finland',
    'FR' : 'France',
    'GF' : 'French Guiana',
    'PF' : 'French Polynesia',
    'TF' : 'French Southern Territories',
    'GA' : 'Gabon',
    'GM' : 'Gambia',
    'GE' : 'Georgia',
    'DE' : 'Germany',
    'GH' : 'Ghana',
    'GI' : 'Gibraltar',
    'GR' : 'Greece',
    'GL' : 'Greenland',
    'GD' : 'Grenada',
    'GP' : 'Guadeloupe',
    'GU' : 'Guam',
    'GT' : 'Guatemala',
    'GG' : 'Guernsey',
    'GN' : 'Guinea',
    'GW' : 'Guinea-Bissau',
    'GY' : 'Guyana',
    'HT' : 'Haiti',
    'HM' : 'Heard Island & Mcdonald Islands',
    'VA' : 'Holy See (Vatican City State)',
    'HN' : 'Honduras',
    'HK' : 'Hong Kong',
    'HU' : 'Hungary',
    'IS' : 'Iceland',
    'IN' : 'India',
    'ID' : 'Indonesia',
    'IR' : 'Iran, Islamic Republic Of',
    'IQ' : 'Iraq',
    'IE' : 'Ireland',
    'IM' : 'Isle Of Man',
    'IL' : 'Israel',
    'IT' : 'Italy',
    'JM' : 'Jamaica',
    'JP' : 'Japan',
    'JE' : 'Jersey',
    'JO' : 'Jordan',
    'KZ' : 'Kazakhstan',
    'KE' : 'Kenya',
    'KI' : 'Kiribati',
    'KR' : 'Korea',
    'KW' : 'Kuwait',
    'KG' : 'Kyrgyzstan',
    'LA' : 'Lao People\'s Democratic Republic',
    'LV' : 'Latvia',
    'LB' : 'Lebanon',
    'LS' : 'Lesotho',
    'LR' : 'Liberia',
    'LY' : 'Libyan Arab Jamahiriya',
    'LI' : 'Liechtenstein',
    'LT' : 'Lithuania',
    'LU' : 'Luxembourg',
    'MO' : 'Macao',
    'MK' : 'Macedonia',
    'MG' : 'Madagascar',
    'MW' : 'Malawi',
    'MY' : 'Malaysia',
    'MV' : 'Maldives',
    'ML' : 'Mali',
    'MT' : 'Malta',
    'MH' : 'Marshall Islands',
    'MQ' : 'Martinique',
    'MR' : 'Mauritania',
    'MU' : 'Mauritius',
    'YT' : 'Mayotte',
    'MX' : 'Mexico',
    'FM' : 'Micronesia, Federated States Of',
    'MD' : 'Moldova',
    'MC' : 'Monaco',
    'MN' : 'Mongolia',
    'ME' : 'Montenegro',
    'MS' : 'Montserrat',
    'MA' : 'Morocco',
    'MZ' : 'Mozambique',
    'MM' : 'Myanmar',
    'NA' : 'Namibia',
    'NR' : 'Nauru',
    'NP' : 'Nepal',
    'NL' : 'Netherlands',
    'AN' : 'Netherlands Antilles',
    'NC' : 'New Caledonia',
    'NZ' : 'New Zealand',
    'NI' : 'Nicaragua',
    'NE' : 'Niger',
    'NG' : 'Nigeria',
    'NU' : 'Niue',
    'NF' : 'Norfolk Island',
    'MP' : 'Northern Mariana Islands',
    'NO' : 'Norway',
    'OM' : 'Oman',
    'PK' : 'Pakistan',
    'PW' : 'Palau',
    'PS' : 'Palestinian Territory, Occupied',
    'PA' : 'Panama',
    'PG' : 'Papua New Guinea',
    'PY' : 'Paraguay',
    'PE' : 'Peru',
    'PH' : 'Philippines',
    'PN' : 'Pitcairn',
    'PL' : 'Poland',
    'PT' : 'Portugal',
    'PR' : 'Puerto Rico',
    'QA' : 'Qatar',
    'RE' : 'Reunion',
    'RO' : 'Romania',
    'RU' : 'Russian Federation',
    'RW' : 'Rwanda',
    'BL' : 'Saint Barthelemy',
    'SH' : 'Saint Helena',
    'KN' : 'Saint Kitts And Nevis',
    'LC' : 'Saint Lucia',
    'MF' : 'Saint Martin',
    'PM' : 'Saint Pierre And Miquelon',
    'VC' : 'Saint Vincent And Grenadines',
    'WS' : 'Samoa',
    'SM' : 'San Marino',
    'ST' : 'Sao Tome And Principe',
    'SA' : 'Saudi Arabia',
    'SN' : 'Senegal',
    'RS' : 'Serbia',
    'SC' : 'Seychelles',
    'SL' : 'Sierra Leone',
    'SG' : 'Singapore',
    'SK' : 'Slovakia',
    'SI' : 'Slovenia',
    'SB' : 'Solomon Islands',
    'SO' : 'Somalia',
    'ZA' : 'South Africa',
    'GS' : 'South Georgia And Sandwich Isl.',
    'ES' : 'Spain',
    'LK' : 'Sri Lanka',
    'SD' : 'Sudan',
    'SR' : 'Suriname',
    'SJ' : 'Svalbard And Jan Mayen',
    'SZ' : 'Swaziland',
    'SE' : 'Sweden',
    'CH' : 'Switzerland',
    'SY' : 'Syrian Arab Republic',
    'TW' : 'Taiwan',
    'TJ' : 'Tajikistan',
    'TZ' : 'Tanzania',
    'TH' : 'Thailand',
    'TL' : 'Timor-Leste',
    'TG' : 'Togo',
    'TK' : 'Tokelau',
    'TO' : 'Tonga',
    'TT' : 'Trinidad And Tobago',
    'TN' : 'Tunisia',
    'TR' : 'Turkey',
    'TM' : 'Turkmenistan',
    'TC' : 'Turks And Caicos Islands',
    'TV' : 'Tuvalu',
    'UG' : 'Uganda',
    'UA' : 'Ukraine',
    'AE' : 'United Arab Emirates',
    'GB' : 'United Kingdom',
    'US' : 'United States',
    'UM' : 'United States Outlying Islands',
    'UY' : 'Uruguay',
    'UZ' : 'Uzbekistan',
    'VU' : 'Vanuatu',
    'VE' : 'Venezuela',
    'VN' : 'Viet Nam',
    'VG' : 'Virgin Islands, British',
    'VI' : 'Virgin Islands, U.S.',
    'WF' : 'Wallis And Futuna',
    'EH' : 'Western Sahara',
    'YE' : 'Yemen',
    'ZM' : 'Zambia',
    'ZW' : 'Zimbabwe'
};

function getCountryName (countryCode) {
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
    a.addClass("movie");
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
$("#add-movie").on("click", function(event) {
  event.preventDefault();
  movie = $("#movie-input").val().trim();
  if (movies.indexOf(movie) === -1){
   movies.push(movie);
  }
  localStorage.setItem("movies_list", JSON.stringify(movies));
  displayMovieInfo(movie);

  renderMovieSearchButtons();
  
});