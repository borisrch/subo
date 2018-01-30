# Subo Weather

Subo is a weather web app, that will check the weather around you and any place in the world. Subo is designed to be clean and lightweight.

## Features

Subo will automatically display your current area's local weather. To check the weather at another location, type in a city in the search box and press go. To change the current sky backdrop, select the icon in the top right, which toggles through the options.

## Built With

* HTML
* Javascript - just plain vanilla js.
* CSS/CSS Grids - grids used to construct responsive layout.
* [Animate.css](https://daneden.github.io/animate.css/)
* [FontAwesome](http://fontawesome.io/)
* [Weather-Icons](http://erikflowers.github.io/weather-icons/)

## How It Works
### API Calls
Basically the app functions through a series of AJAX requests. First an api call goes to [ipapi.co](https://ipapi.co/) to get the client's   `latitude` and `longitude` from their current position. The lat and long is then used in a call to [openweathermap.org](http://openweathermap.org/), and the JSON is used to construct the main container. When the user enters a query in the search field, the query is sent through another api call to [Google Maps Geolocation](https://developers.google.com/maps/documentation/geolocation/intro), which returns another set of lat and long, which is used in another call to openweathermap.org, to construct the alt container displaying the returned query. JavaScript DOM manipulation handles the data to construct the page.

### Misc.
The weather icons have a day or night variant depending on the time of day. Getting the client's time is simple enough, however getting a time from a location that the user searched was a bit more problematic. Google Maps Timezone API did the trick (though their `timestamp` request was a bit of a pain to do).

## To-Do List
* Add a clock to both timezones.
* Usability/visibility improvements.

## Version
2.1.1
