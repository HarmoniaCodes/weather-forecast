// set variables for page elements
// const todayWeather = document.getElementById("weatherToday");
const todayWeatherCity = document.getElementById("todayWeatherCity");
const todayWeatherForecast = document.getElementById("todayWeatherConditions");
const weather5Day = document.getElementById("weather5Day");
const citySearchForm = document.getElementById("citySearchForm");
const searchData = document.getElementById("searchData");
// create an event listener for the search button
citySearchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    getWeather();
    saveCity();
    console.log("button made");
})
const apiKey = ""

// get weather data from openweathermap API
async function getWeather() {
    var weatherQuery = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue.value + "&units=imperial&appid=" + apiKey;
    console.log(weatherQuery);
    const results = await fetch(weatherQuery);
    const data = await results.json();
    clearWeatherData();
    setTodayWeather(data);
    setWeather(data);
}
// set the current weather
function setTodayWeather(data) {
    todayWeatherCity.innerText = data.city.name + " " + dayjs((data.list[0].dt) * 1000).format("(MM/DD/YYYY)");
    todayWeatherForecast.innerText = "Currently: " + Math.round(data.list[0].main.temp) + "°F 🌧️" + "Wind: " + data.list[0].wind.speed + "mph" + "Humidity: " + data.list[0].main.humidity + "%";
}
// set the forecast weather
function setWeather(data) {
    // write the city and date to the weatherToday section
    // create the 5-day forecast blocks
    for (let i = 1; i < data.list.length; i++) {
        const tempSpan = document.createElement("p");
        const windSpan = document.createElement("p");
        const humidSpan = document.createElement("p");
        var dayBlockContainer = document.createElement("div");
        var dayBlockData = document.createElement("div");
        var dayBlockDate = document.createElement("h4");
        var dayBlockDateSubtext = document.createElement("h5");
        dayBlockContainer.setAttribute("class", "card");
        dayBlockData.setAttribute("class", "card-body fs-3 fw-light");
        dayBlockDate.setAttribute("class", "card-title fs-1")
        weather5Day.append(dayBlockContainer);
        dayBlockContainer.prepend(dayBlockData);
        dayBlockData.prepend(dayBlockDate);
        dayBlockDate.innerText = dayjs((data.list[i].dt) * 1000).format("dddd");
        dayBlockDate.append(dayBlockDateSubtext);
        dayBlockDateSubtext.innerText = dayjs((data.list[i].dt) * 1000).format("MMM DD YYYY - hh:mma");
        dayBlockData.append(tempSpan, windSpan, humidSpan);
        tempSpan.setAttribute("class", "fs-1");
        tempSpan.textContent = Math.round(data.list[i].main.temp) + "°F 🌧️";
        windSpan.textContent = "Wind: " + data.list[i].wind.speed + "mph";
        humidSpan.textContent = "Humidity: " + data.list[i].main.humidity + "%";

        //     if (data.list[0].weather[0].main == "Rain") {
        //         todayWeather.style.backgroundImage = "url('./images/rainy.gif')";
        //     } else if (data.list[i].weather[0].main == "Clouds") {
        //         todayWeather.style.backgroundImage = "url('./images/clouds.gif')";
        //     } else { todayWeather.style.backgroundImage = "url('./images/clear.gif')"; }
    }
    console.log(data);
    // set the background colors according to weather type

}

function clearWeatherData() {
    // clear the weather data on each load
    todayWeatherForecast.innerHTML = "";
    weather5Day.innerHTML = "";
}



// save searched cities to localstorage

if (localStorage.getItem("savedCities") === null) {
    var savedCitiesArray = [];
} else {
    var savedCitiesArray = JSON.parse(localStorage.getItem("savedCities"));
    for (i = 0; i < savedCitiesArray.length; i++) {
        console.log();
        makeCityButton(savedCitiesArray[i].city);
    }
}
function saveCity() {
    var searchedCity = Object.fromEntries(new FormData(citySearchForm)).city;
    savedCity = {
        city: searchedCity
    }
    savedCitiesArray.push(savedCity);
    localStorage.setItem("savedCities", JSON.stringify(savedCitiesArray));
    makeCityButton(searchedCity)
}

function makeCityButton(searchedCity) {
    const btn = document.createElement("button");
    btn.innerText = searchedCity;
    btn.setAttribute("class", "btn btn-primary mt-2");
    searchData.append(btn);
}