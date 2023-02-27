// set variables for page elements
const todayWeather = document.getElementById("weatherToday");
const todayWeatherCity = document.getElementById("todayWeatherCity");
const weather5Day = document.getElementById("weather5Day");
const citySearchForm = document.getElementById("citySearchForm");
const searchData = document.getElementById("searchData");
// create an event listener for the search button
citySearchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    getWeather();
    makeCityButton();
    console.log("button made");
})
const apiKey = ""

// get weather data from openweathermap API
async function getWeather() {
    var weatherQuery = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue.value + "&units=imperial&appid=" + apiKey;
    console.log(weatherQuery);
    const results = await fetch(weatherQuery);
    const data = await results.json();
    setWeather(data);
}
// write the weather data to the page
function setWeather(data) {
    // write the city and date to the weatherToday section
    todayWeatherCity.innerText = data.city.name + " " + dayjs((data.list[0].dt) * 1000).format("(MM/DD/YYYY)");

    // create the 5-day forecast blocks
    for (let i = 0; i < data.list.length; i++) {
        var dayBlockContainer = document.createElement("div");
        var dayBlockData = document.createElement("div");
        var dayBlockDate = document.createElement("h4");
        const tempSpan = document.createElement("p");
        const windSpan = document.createElement("p");
        const humidSpan = document.createElement("p");
        dayBlockContainer.setAttribute("class", "card mb-2");
        dayBlockData.setAttribute("class", "card-body");
        dayBlockDate.setAttribute("class", "card-title")
        weather5Day.append(dayBlockContainer);
        dayBlockContainer.prepend(dayBlockData);
        dayBlockData.prepend(dayBlockDate);
        dayBlockDate.innerText = dayjs((data.list[i].dt) * 1000).format("dddd, MMM DD YYYY - hh:mma");
        dayBlockData.append(tempSpan);
        tempSpan.append("Temp:" + Math.round(data.list[i].main.temp));
        dayBlockData.append(windSpan);
        windSpan.append("Wind: " + data.list[i].wind.speed);
        dayBlockData.append(humidSpan);
        humidSpan.append("Humidity: " + data.list[i].main.humidity)
    }
    console.log(data);
    console.log(data.list.length);
}

function saveCity(event) {
    // cityHistory.append(cityBtn);
    // cityBtn.setAttribute("class","btn btn-primary");
    // cityBtn.innerText = event.target.value;
}

function makeCityButton() {
    const btn = document.createElement("button");
    btn.innerText = Object.fromEntries(new FormData(citySearchForm)).city;
    btn.setAttribute("class", "btn btn-primary mt-2");
    searchData.append(btn);
}