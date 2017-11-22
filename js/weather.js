var lat, lon, tWeather, celsius, minCelsius, maxCelsius;
var wind;
var city;
var region;
var local;
var country;
var condition;
var conditionDesc;
var user;
var windCondition;
var iconTag;
var conditionID;
var dn;

var now = new Date();
var nowTime = now.getTime();
var currentHour = now.getHours();

$.getJSON('https://ipapi.co/json/', callbackFunction);

function callbackFunction(data) {
  lat = data.latitude;
  lon = data.longitude;
  city = data.city;
  region = data.region;
  country = data.country_name;

  getWeather();

}

function getWeather() {
  $.getJSON('https://api.openweathermap.org/data/2.5/weather?' + 'lat=' + lat + '&lon=' + lon + '&appid=a1858fbc0254dcc27c68cbf5e649ab4a', callWeather)
}

function callWeather(data) {

  condition = data.weather[0].main;
  conditionDesc = data.weather[0].description;
  conditionID = data.weather[0].id;
  console.log(conditionDesc);
  console.log(conditionID);
  iconTag = conditionID;

  celsius = convertC(data.main.temp);
  minCelsius = convertC(data.main.temp_min);
  maxCelsius = convertC(data.main.temp_max);
  wind = data.wind.speed;

  windCondition = beaufort(wind);

  local = data.name;

  dn = checkTime(currentHour);
  console.log(dn);

  $('#ConditionLabel').append(condition);
  $('#TempIcon').append('<i class="wi wi-owm-' + dn + '-' + iconTag + '"></i>');

  $('#TempLabel').append(celsius);
  $('#Degree').append('°');

  if (region != "null") {
      $('#CityNameLabel').append(city + ', ' + region);
  } else {
      $('#CityNameLabel').append(city);
  }


  $('#LocalLabel').append(local);
  $('#WindConditionLabel').append(windCondition);

  $('#min').append(minCelsius + ' °C');
  $('#max').append(maxCelsius + ' °C');

}

function convertC(number) {
  number = Math.floor(number - 273.15);
  return number;
}

function beaufort(number) {
  var result;

  switch(true) {

    case number >= 32.7:
    result = "Hurricane force";
    break;

    case number >= 28.5:
    result = "Violent storm";
    break;

    case number >= 24.5:
    result = "Storm";
    break;

    case number >= 20.8:
    result = "Severe gale";
    break;

    case number >= 17.2:
    result = "Gale";
    break;

    case number >= 13.2:
    result = "High wind";
    break;

    case number >= 10.8:
    result = "Strong breeze";
    break;

    case number >= 8:
    result = "Fresh breeze";
    break;

    case number >= 5.5:
    result = "Moderate breeze";
    break;

    case number >= 3.4:
    result = "Gentle breeze";
    break;

    case number >= 1.6:
    result = "Light breeze";
    break;

    case number >= 0.3:
    result = "Light air";
    break;

    case number >= 0.1:
    result = "Calm";
    break;

  }

  return result;
}
/**
function getWeatherIcon(desc) {
  var icon;

  switch(desc) {
    case "broken clouds":
    icon = "wi-cloudy";
    break;

    case "clear sky":
    icon = "wi-day-sunny";
    break;

    case "few clouds":
    icon = "wi-day-cloudy";
    break;

    case "overcast clouds":

    case "shower rain":
    icon = "wi-day-showers";
    break;

    case "rain":
    icon = "wi-day-rain";
    break;

    case "thunderstorm":
    icon = "wi-day-thunderstorm";
    break;

    case "snow":
    icon = "wi-day-snowy";
    break;

    case "mist":
    icon = "wi-day-fog";
    break;
  }

  return icon;
}
**/

var countDownDate = new Date("Dec 20, 2017 17:00:00").getTime();

var x = setInterval(function() {
var distance = countDownDate - nowTime;
var days = Math.floor(distance / (1000 * 60 * 60 * 24));
var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
var seconds = Math.floor((distance % (1000 * 60)) / 1000);
document.getElementById("Timer").innerHTML = days + " d " + hours + " h "
+ minutes + " m " + seconds + " s.";

   if (distance < 0) {
        clearInterval(x);
        document.getElementById("Timer").innerHTML = "EXPIRED";
    }
}, 1000);

function checkTime(time) {
  var dn;

  if (time > 6 && time < 18) {
    dn = "day";
  } else {
    dn = "night";
  }

  return dn;
}
