const todayWeather = document.getElementById("weatherToday");
const todayWeatherCity = document.getElementById("todayWeatherCity");
const weather5Day = document.getElementById("weather5Day");

const apiKey = ""

const weatherQuery = "https://api.openweathermap.org/data/2.5/forecast?q=Atlanta&cnt=5&appid=" + apiKey;

// get weather data from openweathermap API
async function getWeather() {
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
        dayBlockContainer.setAttribute("class", "card col");
        dayBlockData.setAttribute("class", "card-body");
        dayBlockDate.setAttribute("class", "card-title")
        weather5Day.append(dayBlockContainer);
        dayBlockContainer.append(dayBlockData);
        dayBlockData.append(dayBlockDate);
        dayBlockDate.innerText = dayjs((data.list[i].dt) * 1000).format("MM/DD/YYYY");
        dayBlockData.append("Temp: " + data.list[i].main.temp)
        dayBlockData.append("Wind: " + data.list[i].wind.speed)
        dayBlockData.append("Humidity: " + data.list[i].main.humidity)
    }
    console.log(data);
    console.log(data.list.length);
}

getWeather();