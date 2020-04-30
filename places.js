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
        const city = e.suggestion.city;
        const state = e.suggestion.administrative;
        const country = e.suggestion.country.toUpperCase();

        if (city != undefined && state != undefined && country != undefined) {
            checkCity(city, state, country, idCount);
            // if the search was successful then store the details in local storage
            localStorage.setItem("idCount", idCount);
            idCount++;
        }
    });
})();

/**
 * LOCAL STORAGE
 */

//  store the cards created by the search box
let idCount;
const localStorageIdCount = localStorage.getItem("idCount");
if (localStorageIdCount != null) {
    idCount = parseInt(localStorageIdCount);
} else {
    idCount = 0;
}

const object = {
    id: [],
    city: [],
    state: [],
    country: [],
};

const storedData = JSON.parse(localStorage.getItem("obj"));
if (storedData != null) {
    object.id = storedData.id;
    object.city = storedData.city;
    object.state = storedData.state;
    object.country = storedData.country;
} else {
    console.log("stored data == null");
}

function createWeatherObject(city, state, country, divIdCount) {
    object.id.push(divIdCount);
    object.city.push(city);
    object.state.push(state);
    object.country.push(country);
    console.log("createObject: ", object);
    return object;
}
/**
 * get weather data
 */

// Nearest City
async function getNearestCity() {
    const urlNearestCity =
        "https://api.airvisual.com/v2/nearest_city?key=a3765a9b-e91c-4fc7-9b0e-0992e69410f0";

    const response = await fetch(urlNearestCity);
    const processedResponse = await response.json();

    const city = processedResponse.data.city;
    const state = processedResponse.data.state;
    const country = processedResponse.data.country;

    // store the location coordinates of the nearest city in the local storage
    const obj = createWeatherObject(city, state, country, idCount);
    localStorage.setItem("obj", JSON.stringify(obj));
    localStorage.setItem("idCount", idCount);
    idCount++;
    displayData(processedResponse, idCount);
}
// Check whether city details can be fetched
async function checkCity(city, state, country, divIdCount) {
    const urlCityData = `https://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=a3765a9b-e91c-4fc7-9b0e-0992e69410f0`;

    const response = await fetch(urlCityData);
    const processedResponse = await response.json();

    if (processedResponse.status === "success") {
        const obj = createWeatherObject(city, state, country, divIdCount);
        localStorage.setItem("obj", JSON.stringify(obj));
        getCityData(city, state, country, divIdCount);
    } else {
        alert("city not found");
    }
}
// Get data of cities
async function getCityData(city, state, country, divIdCount) {
    const urlCityData = `https://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=a3765a9b-e91c-4fc7-9b0e-0992e69410f0`;

    const response = await fetch(urlCityData);
    const processedResponse = await response.json();
    if (processedResponse.status === "success") {
        displayData(processedResponse, divIdCount);
    }
}
// Display data
function displayData(cityData, divIdCount) {
    //get city name
    const city = cityData.data.city;

    //get weather details of city
    const weather = cityData.data.current.weather;

    //get weather details
    const humidity = weather.hu;
    const pressure = weather.pr;
    const temp = weather.tp;

    //get AQI
    const aqi = cityData.data.current.pollution.aqius;
    //get body
    const body = document.getElementById("weather-details");
    const container = document.createElement("div");
    container.className = "card";
    container.id = divIdCount;

    setDataInCard(
        city,
        aqi,
        humidity,
        pressure,
        temp,
        container,
        body,
        divIdCount
    );
}

function setDataInCard(
    city,
    aqi,
    humidity,
    pressure,
    temp,
    container,
    body,
    divIdCount
) {
    // Create a div container that will store the other elements
    // city name
    const cityh3 = document.createElement("h3");
    cityh3.className = "city";
    cityh3.innerHTML = `<i class="uil uil-building"></i>${city}`;
    container.appendChild(cityh3);

    // AQI
    const aqih2 = document.createElement("h2");
    aqih2.className = "aqi";
    if (aqi <= 50) {
        container.classList.add("green");
    } else if (aqi <= 100) {
        container.classList.add("yellow");
    } else if (aqi <= 150) {
        container.classList.add("orange");
    } else if (aqi <= 200) {
        container.classList.add("red");
    } else if (aqi <= 300) {
        container.classList.add("purple");
    } else if (aqi <= 500) {
        container.classList.add("brown");
    }

    aqih2.innerHTML = `AQI ${aqi}`;
    container.appendChild(aqih2);

    // temperature
    const temph3 = document.createElement("h3");
    temph3.className = "temp";
    temph3.innerHTML = `${temp}<i class="uil uil-celsius"></i>`;
    container.appendChild(temph3);

    // humidity
    const humidityp = document.createElement("p");
    humidityp.className = "humidity";
    humidityp.innerHTML = `<i class="uil uil-tear"></i>${humidity}%`;
    container.appendChild(humidityp);

    // pressure
    const pressurep = document.createElement("p");
    pressurep.className = "pressure";
    pressurep.innerHTML = `<i class="uil uil-dashboard"></i>${pressure}mb`;
    container.appendChild(pressurep);

    // delete
    const deleteIcon = document.createElement("span");
    deleteIcon.innerHTML = `<i class="uil uil-trash-alt" onclick="removeElement(${divIdCount})"></i>`;
    deleteIcon.classList.add("delete");
    container.appendChild(deleteIcon);

    body.appendChild(container);
}

//  delete the card
function removeElement(parentDiv) {
    if (document.getElementById(parentDiv.toString())) {
        var parent = document.getElementById(parentDiv);
        var div = document.getElementById("weather-details");
        div.removeChild(parent);

        // remove the details of a id
        const deleteIndex = object.id.indexOf(parseInt(parentDiv));
        deleteCard(deleteIndex);
    } else {
        alert("Child div has already been removed or does not exist.");
        return false;
    }

    function deleteCard(deleteIndex) {
        object.id.splice(deleteIndex, 1);
        object.city.splice(deleteIndex, 1);
        object.state.splice(deleteIndex, 1);
        object.country.splice(deleteIndex, 1);
        localStorage.setItem("obj", JSON.stringify(object));
    }
}

// local storage
function createFromLocalStorage() {
    if (JSON.parse(localStorage.getItem("obj")) != null) {
        const localData = JSON.parse(localStorage.getItem("obj"));
        const len = localData.id.length;

        for (let count = 0; count < len; count++) {
            const city = localData.city[count];
            const state = localData.state[count];
            const country = localData.country[count];
            getCityData(city, state, country, localData.id[count]);
        }
    }
}

function createCard(localData, count) {
    const city = localData.city[count];
    const state = localData.state[count];
    const country = localData.country[count];
    getCityData(city, state, country, localData.id[count]);
    console.log("card created");
}

window.onload = createFromLocalStorage();
window.onload = getPreviousTheme();

// get the theme switcher variables
function getPreviousTheme() {
    const localStorageTheme = localStorage.getItem("theme");

    if (localStorageTheme != null) {
        document.body.className = localStorageTheme;
        if (localStorageTheme === "dark") {
            const themeSwitchRound = document.getElementById(
                "theme-switch-round"
            );

            const themeSwitch = document.getElementById("theme-switch");
            themeSwitch.checked = true;
            themeSwitchRound.classList.add("local-dark");
        }
    }
}
