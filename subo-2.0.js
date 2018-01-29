var city, country, lat, long, condition, conditionID, celsius, wind, windCondition, dn, query, cityALT, latALT, longALT, conditionALT, conditionIDALT, celsiusALT, windALT, windConditionALT, localdate;
var width = window.innerWidth;
var height = window.innerHeight;


var count = getSky();

getIP();

function getIP() {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://ipapi.co/json/', true);    
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(request.responseText);
          city = data.city;
          country = data.country_name;
          lat = data.latitude;
          long = data.longitude;
          addWeather();
      } else {        
        console.log("Error: failed to retrieve latitude/longitude.");    
      }
    };    
    request.onerror = function() {
      // There was a connection error of some sort
    };    
    request.send();
};

function addWeather() {
  var request = new XMLHttpRequest();
  request.open('GET', 'https://api.openweathermap.org/data/2.5/weather?' + 'lat=' + lat + '&lon=' + long + '&appid=a1858fbc0254dcc27c68cbf5e649ab4a', true);    
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
        condition = data.weather[0].main;
        conditionID = data.weather[0].id;
        celsius = convertC(data.main.temp);
        wind = data.wind.speed;
        windCondition = beaufort(wind);
        dn = getTime();
        writeHTML();
    } else {        
      console.log("Error: failed to reach Weather API.");    
    }
  };    
  request.onerror = function() {
    // There was a connection error of some sort
  };    
  request.send();  
}

function writeHTML() {
  document.getElementById("city").innerHTML = city;
  document.getElementById("temp").innerHTML = celsius + "° ";
  document.getElementById("tempIcon").innerHTML = '<i class="wi wi-owm-' + dn + '-' + conditionID + '"></i>';
  document.getElementById("condition").innerHTML = condition;
  document.getElementById("windCondition").innerHTML = windCondition;
  // Query bar animation in.
  var el = document.querySelector('.container');
  el.classList.add('animated', 'fadeIn');
  var query = document.getElementById('query');
  query.style.visibility = "visible";
  showQuery();
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

function getTime() {
  var dn;
  var currentHour = new Date().getHours;
  if (currentHour > 6 && currentHour < 18) {
    dn = "day";
  } else {
    dn = "night";
  }
  return dn;
}

function dnALT2() {
  var dnALT;
  if (localdate > 6 && localdate < 18) {
    dnALT = "day";
  } else {
    dnALT = "night";
  }
  return dnALT;
}
// Event handlers
window.onload=function(){
  const GOBUTTON = document.querySelector(".button-go");
  GOBUTTON.addEventListener('click', event => search(), true);

  const MINI = document.getElementById('mini');
  MINI.addEventListener('click', event => changeSky(), true);
}

function search() {
  query = document.getElementById('search').value;  
  var request = new XMLHttpRequest();
  request.open('GET', 'https://maps.googleapis.com/maps/api/geocode/json?address='+ query + '&key=AIzaSyC4PlGC2-Ttt_GFzT_9i-grhCqqxo5ZqAk', true);
  request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    var data = JSON.parse(request.responseText);
    cityALT = data.results[0].address_components[0].long_name;
    latALT = data.results[0].geometry.location.lat;
    longALT = data.results[0].geometry.location.lng
    // Loading animation.
    var elem = document.getElementById("load");
    elem.style.visibility = "visible";
    // Get weather from API.
    getWeatherAlt();
    // Check timezone of query
    getTimeAlt();
    // Remove loading.
    hideLoading();

  } else {
    console.log("Error: failed to reach Geolocation API.")
    }
  };
  request.onerror = function() {
  // There was a connection error of some sort
  };
  request.send();
}

function getWeatherAlt() {
  var request = new XMLHttpRequest();
  request.open('GET', 'https://api.openweathermap.org/data/2.5/weather?' + 'lat=' + latALT + '&lon=' + longALT + '&appid=a1858fbc0254dcc27c68cbf5e649ab4a', true);    
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
        conditionALT = data.weather[0].main;
        conditionIDALT = data.weather[0].id;
        celsiusALT = convertC(data.main.temp);
        windALT = data.wind.speed;
        windConditionALT = beaufort(wind);
        // Writes HTML
        modifyAlt();
    } else {        
      console.log("Error: failed to reach Weather API.");    
    }
  };    
  request.onerror = function() {
    console.log("Oops");
  };    
  request.send();  
}

function getTimeAlt() {
  var loc = latALT + ', ' + longALT;
  var targetDate = new Date();
  var timestamp = targetDate.getTime()/1000 + targetDate.getTimezoneOffset() * 60;
  var request = new XMLHttpRequest();
  request.open('GET', 'https://maps.googleapis.com/maps/api/timezone/json?location=' + loc + '&timestamp=' + timestamp + '&key=AIzaSyD67llA19Dcr1a6NXiLKvEL1RcLVS_XTBQ', true);
  request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    var data = JSON.parse(request.responseText);
    var offsets = data.dstOffset * 1000 + data.rawOffset * 1000;
    localdate = new Date(timestamp * 1000 + offsets).getHours();     
  } else {
    console.log("Error: failed to reach Geolocation Timezone API.")
  }
};
request.onerror = function() {
  // There was a connection error of some sort
};

request.send();
}

function modifyAlt() {
  var dnALT = dnALT2(); 
  document.getElementById("cityALT").innerHTML = cityALT;
  document.getElementById("tempALT").innerHTML = celsiusALT + "° ";
  document.getElementById("tempIconALT").innerHTML = '<i class="wi wi-owm-' + dnALT + '-' + conditionIDALT + '"></i>';
  document.getElementById("conditionALT").innerHTML = conditionALT;
  document.getElementById("windConditionALT").innerHTML = windConditionALT;

  // CSS removing padding.
  var alt = document.getElementById('alt');
  alt.style.paddingTop = 5;
  // CSS adding padding.
  alt.style.paddingBottom = 20;

  // Animation
  var el = document.getElementById('alt');
  el.classList.add('animated', 'bounceIn');
  setTimeout(function() {
    el.classList.remove('animated', 'bounceIn');
  }, 1000)
}

function hideLoading() {
  var delay = 1000; 
  setTimeout(function() {
    var elem = document.getElementById("load");
    elem.style.visibility = "hidden";
  }, delay);
}

function showQuery() {
  var el = document.getElementById('query');
  el.classList.add('animated', 'flipInX');
}

// For getting 'count' for current time.
function getSky() {  
  let CT = new Date();
  let CM = CT.getMinutes();
  let CH = CT.getHours();
  // Cycles through the hours. Picture based on even/odd minute.
  if (CH >= 6 && CH < 12) {
    if (CM % 2 == 1) {
      count = 1;
    } else {
      count = 2;
    }
  } else if (CH >= 12 && CH < 15) {
    if (CM % 2 == 1) {
      count = 3;
    } else {
      count = 4;
    } 
  } else if (CH >= 15 && CH < 17) {
      count = 5;
  } else if (CH >= 17 && CH < 21) {
    if (CM % 2 == 1) {
      count = 6;
    } else {
      count = 7;
    }
  } else {
      if (CM % 2 == 1) {
        count = 8;
      } else {
        count = 9;
      }
  }
  return count;
}
// Actually setting the background.
function setSky(count) {
  let el = document.getElementById('bg-main');
  
  // In case counter goes to 10+, it is resetted at 1.
  if (count % 10 == 0) {
    count = 1;
  } else {
    count = count % 10;
  }
  switch(count) {
    case 1:
    el.style.backgroundImage = "url('./assets/1.jpg')";
    whiteText();
    break;
    case 2:
    el.style.backgroundImage = "url('./assets/2.jpg')";
    whiteText();
    break;
    case 3:
    el.style.backgroundImage = "url('./assets/3.jpg')";
    blackText();
    break;
    case 4:
    el.style.backgroundImage = "url('./assets/4.jpg')";
    blackText();
    break;
    case 5:
    el.style.backgroundImage = "url('./assets/5.jpg')";
    blackText();
    break;
    case 6:
    el.style.backgroundImage = "url('./assets/6.jpg')";
    whiteText();
    break;
    case 7:
    el.style.backgroundImage = "url('./assets/7.jpg')";
    whiteText();
    break;
    case 8:
    el.style.backgroundImage = "url('./assets/8.jpg')";
    whiteText();
    break;
    case 9:
    el.style.backgroundImage = "url('./assets/9.jpg')";
    whiteText();
    break;
  }
  return count;
}

function changeSky() {
  count++;
  setSky(count);
}

// Utility functions for text color.

function whiteText() {
  let text = document.getElementById('main');
  let textALT = document.getElementById('alt');
  let mini = document.getElementById('mini');
  text.style.color = "white";
  textALT.style.color = "white";     
  mini.style.color = "white";
  text.style.textShadow = "0 2px 5px rgba(0, 0, 0, .5)";
  textALT.style.textShadow = "0 2px 5px rgba(0, 0, 0, .5)";
  mini.style.textShadow = "0 2px 5px rgba(0, 0, 0, .5)";
}

function blackText() {
  let text = document.getElementById('main');
  let textALT = document.getElementById('alt');
  let mini = document.getElementById('mini');
  text.style.color = "black";
  textALT.style.color = "black";     
  mini.style.color = "black";
  text.style.textShadow = "";
  textALT.style.textShadow = "";
  mini.style.textShadow = "";
}