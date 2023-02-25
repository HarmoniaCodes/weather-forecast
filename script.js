const todayWeather = document.getElementById("weatherToday");

const apiKey = ""

const weatherQuery = "https://api.openweathermap.org/data/2.5/forecast?q=Atlanta&appid=" + apiKey;

async function getWeather() {
    let results = await fetch(weatherQuery);
    let data = await results.json();
    todayWeather.innerText = data.city.name;
    // console.log(data);
}

getWeather();