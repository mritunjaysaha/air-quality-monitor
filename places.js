//Algolio places autocomplete function
(function () {
    var placesAutoComplete = places({
        appId: "plADZ2YX21JB",
        apiKey: "44feabdfe1364e95de212f4818f7d010",
        container: document.querySelector("#search"),
        templates: {
            value: function (suggestion) {
                return suggestion.name;
            },
        },
    }).configure({
        type: "address",
    });

    placesAutoComplete.on("change", function resultSelected(e) {
        console.log(e.suggestion);
        const city = e.suggestion.city;
        const state = e.suggestion.administrative;
        const country = e.suggestion.country.toUpperCase();

        console.log(city, state, country);
        getCityData(city, state, country);
    });
})();
// Nearest City

// Get data of cities
async function getCityData(city, state, country) {
    const urlCityData = `https://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=a3765a9b-e91c-4fc7-9b0e-0992e69410f0`;

    const response = await fetch(urlCityData);
    const processedResponse = await response.json();

    if (processedResponse.status === "success") {
        console.log(processedResponse);
        displayData(processedResponse);
    } else {
        console.log("error");
    }
}

// Display data
function displayData(cityData) {
    console.log(cityData.status);

    //get city name
    const city = cityData.data.city;
    //get weather of that city
    const weather = cityData.data.current.weather;
    //get weather details
    const humidity = weather.hu;
    const pressure = weather.pr;
    const temp = weather.tp;
    //get AQI
    const aqi = cityData.data.current.pollution.aqius;

    console.log(city);
    // console.log(weather);
    console.log(aqi);

    console.log(humidity);
    console.log(pressure);
    console.log(temp);

    // Create a div container that will store the other elements
    //get body
    const body = document.getElementById("weather-details");
    const container = document.createElement("div");
    container.className = "cards";

    const cardsContainer = document.createElement("div");
    cardsContainer.className = "cards-inner-container";
    // city name
    const cityh3 = document.createElement("h3");
    cityh3.innerHTML = city;
    container.appendChild(cityh3);

    // AQI
    const aqih2 = document.createElement("h2");
    aqih2.innerHTML = aqi;
    container.appendChild(aqih2);

    // temperature
    const temph3 = document.createElement("h3");
    temph3.innerHTML = temp;
    container.appendChild(temph3);

    // humidity
    const humidityp = document.createElement("p");
    humidityp.innerHTML = humidity;
    container.appendChild(humidityp);

    // pressure
    const pressurep = document.createElement("p");
    pressurep.innerHTML = pressure;
    container.appendChild(pressurep);

    // Append the containe rto the inner container
    cardsContainer.appendChild(container);
    // append the container to body
    body.appendChild(cardsContainer);
}

/**
 * Create a button that will create the data for multiple
 * states.
 */
