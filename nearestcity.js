const urlNearestCity =
    "https://api.airvisual.com/v2/nearest_city?key=a3765a9b-e91c-4fc7-9b0e-0992e69410f0";

async function getNearestCity() {
    const response = await fetch(urlNearestCity);
    const processedResponse = await response.json();

    console.log(processedResponse.status);

    //get city name
    const city = processedResponse.data.city;
    //get weather of that city
    const weather = processedResponse.data.current.weather;
    //get weather details
    const humidity = weather.hu;
    const pressure = weather.pr;
    const temp = weather.tp;
    //get AQI
    const aqi = processedResponse.data.current.pollution.aqius;

    console.log(city);
    // console.log(weather);
    console.log(aqi);

    console.log(humidity);
    console.log(pressure);
    console.log(temp);

    //get the ID of the container for the city name
    const containerNearestCity = document.getElementById("nearest-city");

    //set the city name
    const cityh3 = document.createElement("h3");
    cityh3.innerHTML = city;
    containerNearestCity.appendChild(cityh3);

    //get the ID of the container for AQI
    const containerAqi = document.getElementById("aqi");
    //set the AQI
    const aqih3 = document.createElement("h3");
    aqih3.innerHTML = `AQI ${aqi}`;
    containerAqi.appendChild(aqih3);

    //get the ID of the container for weather
    const containerWeather = document.getElementById("weather");
    //set the weather deatails
    const humidityp = document.createElement("p");
    humidityp.innerHTML = `Humidity: ${humidity}`;
    containerWeather.appendChild(humidityp);

    const pressurep = document.createElement("p");
    pressurep.innerHTML = `Pressure: ${pressure}`;
    containerWeather.appendChild(pressurep);

    const tempp = document.createElement("p");
    tempp.innerHTML = `Temp: ${temp}`;
    containerWeather.appendChild(tempp);
}

window.onload = getNearestCity();
