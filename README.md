# Celeb Checker

## 1. Application Description

Our application lets you search for a movie title using OMDB’s API and then check the nationality of the actors, writers and directors using Nationalize’s API. We believe our app could be a fun distraction for our users.

## 2. Team responsibilities

Our backend team is: [Kat Gomozova](https://github.com/kgo87) and [Max Lechner](https://github.com/maxlechner). <br>
Our frontend team is: [Joshua Haller](https://github.com/JJHPhoto), [Lana Kim](https://github.com/lk9988) and [Rattanak Leng](https://github.com/rattanakleng). <br>
Our backend team handled most of our JS and some of our HTML while our frontend team worked our HTML & helped with some of our JS.

## 3. Workflow

Our first meeting was deciding responsibilities and getting a working repository. Joshua was asked to be the project manager and create the repository. We made sure that each team member had a working repository and then moved on to picking what application to build. We debated on a hiking app, a health app or the celebrity checker we decided upon. Max had worked with the Nationalize API before and knew how to get the data out, so we leaned on his experience with that API

Next we fleshed out our User Story. We decided the application should be fun to play with and be a pleasant distraction from the current situation around the world. With that in place, we used Figma to wireframe how we wanted our application to look. Then we used ClickUp to begin making tasks that each team could work on separately. We didn’t want to be working on the JS/HTML at the same time because we were concerned about merge conflicts.

Before we broke off into our teams, we went over what CSS framework to work in. We had been told we couldn’t use Bootstrap for our framework. Kat found a Geekflare article with a list of the best CSS frameworks available. We looked at a few but decided on Bulma. Rattanak had used it for one of his homework projects and we felt comfortable being able to use it to build our application.

Our backend team was given the task of getting our OMDB API working and dynamically creating buttons for the actors. Our frontend team was tasked with working out how Bulma worked and getting the application to look as close to our wireframe as possible. Each team spent about an hour working on these tasks and came back together to merge our branches. It took us a few tries to merge correctly but we managed to get our branches merged into the main.

We were then able to break off into our teams and work on separate tasks. The backend team were asked to get our dynamically created buttons to link to the Nationalize API. The frontend team was asked to create a space where the nationality results would be printed on our page and to stylize the elements that the backend team had created.

When we came back together, we tried to merge our branches back into the main branch. We ran into problems. When we merged our branches, we kept deleting the backend team’s recent changes to the JS and duplicating the frontend team’s HTML changes. We decided that we would take a break and come back with fresh eyes the next class.

By the time we met for the next class, Kat had retrieved some of our old code and recreated our repo. We decided as a team that Joshua would be given the files to copy and paste the code over his current code. We proceeded very carefully with the assistance of our TA to get our repositories back into working order. Lana quickly went over the code and found some duplications which we removed. With working repositories, we had a few tasks to finish up and have a working application that we could refine.

We knew that we were going to have both teams working on the JS and needed to be very careful. The backend team was tasked with finishing up linking our buttons to the Nationalize API while the frontend team worked on dynamically creating buttons for the movie directors & writers. We decided to take less time on these and come back for merging branches into the main branch.

At this stage we noticed a few things we wanted to change. The Nationalize API prints two letter country codes, not the actual country’s name. Which we decided was less than ideal. Max quickly found a gist that converted country codes into names. Which the backend team easily plugged into our code. We also noticed that pushing “enter” when searching for a movie wasn’t functional. Rattanak was able to find code that worked inside the confines of Bulma and the frontend team plugged that in.

With everything in place, we decided to see how or application worked. We were pretty satisfied with where we were and decided to make a new wireframe to have our application display our information better.

## 4. Resources

[Nationalize API](https://nationalize.io/) <br>
[OMDB](http://www.omdbapi.com/) <br>
[Bulma](https://bulma.io/) <br>
[Figma](https://www.figma.com/) <br>
[ClickUp](https://clickup.com/) <br>
[Slack](https://slack.com/)
[Geekflare](https://geekflare.com/best-css-frameworks/) <br>
[GithubGist](https://gist.github.com/maephisto/9228207) <br>

## 5. Working screenshots
