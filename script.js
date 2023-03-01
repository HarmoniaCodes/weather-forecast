// set variables for today's weather elements
const todayWeatherCity = document.getElementById("todayWeatherCity");
const todayWeatherForecast = document.getElementById("todayWeatherConditions");
const todayTemp = document.getElementById("todayTemp");
const todayWind = document.getElementById("todayWind");
const todayHumid = document.getElementById("todayHumid");
// set variables for 5-day forecast section
const weather5Day = document.getElementById("weather5Day");
//set variables for search form elements
const citySearchForm = document.getElementById("citySearchForm");
const searchData = document.getElementById("searchData");
// create an event listener for the search button
citySearchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // get the name of the city the user searched so we can pass it to other functions
    var searchedCity = Object.fromEntries(new FormData(citySearchForm)).city;
    getWeather(searchedCity);
    saveCity(searchedCity);
    console.log("button made");
})
const apiKey = ""

// get weather data from openweathermap API
async function getWeather(searchedCity) {
    var weatherQuery = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchedCity + "&units=imperial&appid=" + apiKey;
    console.log(weatherQuery);
    const results = await fetch(weatherQuery);
    const data = await results.json();
    clearWeatherData();
    setTodayWeather(data);
    setWeather(data);
}
// set the current weather
function setTodayWeather(data) {
    todayWeatherCity.innerText = "Current weather for " + data.city.name + " " + dayjs((data.list[0].dt) * 1000).format("(MM/DD/YYYY)");
    todayTemp.append("Currently: " + Math.round(data.list[0].main.temp) + "°F");
    todayWind.append("Wind: " + data.list[0].wind.speed + "mph");
    todayHumid.append("Humidity: " + data.list[0].main.humidity + "%");
    // append emoji for matching weather codes
    if (data.list[i].weather[0].id >= 200 && data.list[i].weather[0].id < 300) {
        todayTemp.append("⛈️");
    } else if (data.list[0].weather[0].id >= 300 && data.list[i].weather[0].id < 600) {
        todayTemp.append("🌧️");
    } else if (data.list[0].weather[0].id >= 600 && data.list[i].weather[0].id < 700) {
        todayTemp.append("❄️");
    } else if (data.list[0].weather[0].id >= 700 && data.list[i].weather[0].id < 800) {
        todayTemp.append("⚠️" + data.list[i].weather[0].main);
    } else if (data.list[0].weather[0].id = 800) {
        todayTemp.append("☀️");
    } else {
        todayTemp.append("🌤");
    }
}
// set the forecast weather
function setWeather(data) {
    // write the city and date to the weatherToday section
    // create the 5-day forecast blocks
    for (let i = 1; i < data.list.length; i += 8) {
        console.log(i);
        const tempSpan = document.createElement("p");
        const windSpan = document.createElement("p");
        const humidSpan = document.createElement("p");
        var dayBlockContainer = document.createElement("div");
        var dayBlockData = document.createElement("div");
        var dayBlockDate = document.createElement("h4");
        var dayBlockDateSubtext = document.createElement("h5");
        dayBlockContainer.setAttribute("class", "card");
        dayBlockData.setAttribute("class", "card-body fs-4 fw-light");
        dayBlockDate.setAttribute("class", "card-title fs-3")
        weather5Day.append(dayBlockContainer);
        dayBlockContainer.prepend(dayBlockData);
        dayBlockData.prepend(dayBlockDate);
        dayBlockDate.innerText = dayjs((data.list[i].dt) * 1000).format("dddd");
        dayBlockDate.append(dayBlockDateSubtext);
        dayBlockDateSubtext.innerText = dayjs((data.list[i].dt) * 1000).format("MMM DD YYYY");
        dayBlockData.append(tempSpan, windSpan, humidSpan);
        // tempSpan.setAttribute("class", "fs-3");
        tempSpan.textContent = Math.round(data.list[i].main.temp) + "°F";
        windSpan.textContent = "Wind: " + data.list[i].wind.speed + "mph";
        humidSpan.textContent = "Humidity: " + data.list[i].main.humidity + "%";
        // add icons for 5-day forecast
        if (data.list[i].weather[0].id >= 200 && data.list[i].weather[0].id < 300) {
            tempSpan.append("⛈️");
        } else if (data.list[i].weather[0].id >= 300 && data.list[i].weather[0].id < 600) {
            tempSpan.append("🌧️");
        } else if (data.list[i].weather[0].id >= 600 && data.list[i].weather[0].id < 700) {
            tempSpan.append("❄️");
        } else if (data.list[i].weather[0].id >= 700 && data.list[i].weather[0].id < 800) {
            tempSpan.append("⚠️" + data.list[i].weather[0].main);
        } else if (data.list[i].weather[0].id = 800) {
            tempSpan.append("☀️");
        } else {
            tempSpan.append("🌤");
        }
    }
    console.log(data);
    // set the background colors according to weather type

}

function clearWeatherData() {
    // clear the weather data on each load
    todayWeatherCity.innerHTML = "";
    todayTemp.innerHTML = "";
    todayWind.innerHTML = "";
    todayHumid.innerHTML = "";
    weather5Day.innerHTML = "";
}



// save searched cities to localstorage

if (localStorage.getItem("savedCities") === null) {
    // if the array doesn't exist (user hasn't performed any searches), create the array
    var savedCitiesArray = [];
} else {
    // create the buttons that the user has searched
    var savedCitiesArray = JSON.parse(localStorage.getItem("savedCities"));
    for (i = 0; i < savedCitiesArray.length; i++) {
        console.log();
        makeCityButton(savedCitiesArray[i].city);
    }
}
function saveCity(searchedCity) {
    if (JSON.stringify(savedCitiesArray).indexOf(searchedCity) == -1) {
        savedCity = {
            city: searchedCity
        }
        savedCitiesArray.push(savedCity);
        localStorage.setItem("savedCities", JSON.stringify(savedCitiesArray));
        makeCityButton(searchedCity)
    }
    else { return }
}

function makeCityButton(searchedCity) {
    const btn = document.createElement("button");
    btn.innerText = searchedCity;
    btn.setAttribute("class", "btn btn-primary mt-2");
    btn.addEventListener("click", function () { getWeather(searchedCity) })
    searchData.append(btn);
}