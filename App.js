const url =
    "https://api.airvisual.com/v2/states?country=INDIA&key=a3765a9b-e91c-4fc7-9b0e-0992e69410f0";

const urlNearestCity =
    "https://api.airvisual.com/v2/nearest_city?key=a3765a9b-e91c-4fc7-9b0e-0992e69410f0";

const urlCountry =
    "https://api.airvisual.com/v2/countries?key=a3765a9b-e91c-4fc7-9b0e-0992e69410f0";

const urlStates =
    "https://api.airvisual.com/v2/states?country=INDIA&key=a3765a9b-e91c-4fc7-9b0e-0992e69410f0";

const urlCities =
    "https://api.airvisual.com/v2/cities?state=Delhi&country=INDIA&key=a3765a9b-e91c-4fc7-9b0e-0992e69410f0";

const urlCityData =
    "https://api.airvisual.com/v2/city?city=Los Angeles&state=California&country=USA&key=a3765a9b-e91c-4fc7-9b0e-0992e69410f0";
const urlmicrodat =
    "https://api.airvisual.com/v2/city?city=Guwahati&state=Assam&country=INDIA&key=a3765a9b-e91c-4fc7-9b0e-0992e69410f0";
const getData = async () => {
    // const response = await fetch(url);
    // const responseData = await response.json();
    // console.log(responseData);

    // const r = await fetch(urlmicrodat);
    // const rd = await r.json();
    // console.log(rd);
    /**List of nearest city */
    const responseNC = await fetch(urlNearestCity);
    const responseNCData = await responseNC.json();
    console.log(responseNCData);
    console.log(responseNCData.data.city);
    // listState(responseData);
    nearestCity(responseNCData);

    /**List of countries */
    // const responseCountry = await fetch(urlCountry);
    // const countryData = await responseCountry.json();

    // const INDIA = countryData.data[33].country;
    // console.log(countryData);
    // console.log(INDIA.toUpperCase());
    /**List of supported states of a country */
    // const responseStates = await fetch(
    //     `https://api.airvisual.com/v2/states?country=${INDIA.toUpperCase()}&key=a3765a9b-e91c-4fc7-9b0e-0992e69410f0`
    // );
    // const dataStates = await responseStates.json();
    // console.log(dataStates);
    // const city = dataStates.data[0].state;
    // console.log(city);
    // const responseCities = await fetch(
    //     `api.airvisual.com/v2/cities?state=New York&country=USA&key=a3765a9b-e91c-4fc7-9b0e-0992e69410f0`
    // );
    // const responseCities = await fetch(
    //     "http://api.airvisual.com/v2/cities?state=Assam&country=INDIA&key=a3765a9b-e91c-4fc7-9b0e-0992e69410f0"
    // );
    // const dataCities = await responseCities.json();
    // console.log(dataCities);
    /**List of supported cities of a country */

    /**Data of a city */
    // const response = await fetch(urlmicrodat);
    // const responseData = await response.json();
    // console.log(responseData);
};

function listState(api) {
    stateArr = api.data;

    let container = document.getElementById("states");
    let ul = document.createElement("ul");

    for (let i = 0; i < stateArr.length; i++) {
        let li = document.createElement("li");
        let v = document.createTextNode(stateArr[i].state);
        li.appendChild(v);
        ul.appendChild(li);
    }
    container.appendChild(ul);

    let selectContainer = document.getElementById("state-options");
    let selectList = document.createElement("select");
    selectContainer.appendChild(selectList);

    for (let i = 0; i < stateArr.length; i++) {
        let option = document.createElement("option");
        option.value = stateArr[i].state;
        option.text = stateArr[i].state;
        selectList.appendChild(option);
    }
}

function nearestCity(api) {
    // console.log(api);
    const container = document.getElementById("nearest-city");

    let h = document.createElement("h1");
    h.className = "header";
    h.innerHTML = `City: ${api.data.city}`;
    container.appendChild(h);

    h = document.createElement("h1");
    h.className = "header";
    h.innerHTML = `State: ${api.data.state}`;
    container.appendChild(h);

    // let p = document.createElement("p");
    // p.innerHTML = `Time: ${api.data.current.weather.ts}`;
    // container.appendChild(p);

    p = document.createElement("p");
    p.innerHTML = `Temperature: ${api.data.current.weather.tp}`;
    container.appendChild(p);

    p = document.createElement("p");
    p.innerHTML = `Pressure: ${api.data.current.weather.pr}`;
    container.appendChild(p);

    p = document.createElement("p");
    p.innerHTML = `Humidity: ${api.data.current.weather.hu}%`;
    container.appendChild(p);

    p = document.createElement("p");
    p.innerHTML = `Wind: ${api.data.current.weather.ws} m/s`;
    container.appendChild(p);

    p = document.createElement("p");
    p.innerHTML = `Wind Direction: ${api.data.current.weather.wd}`;
    container.appendChild(p);

    p = document.createElement("p");
    p.innerHTML = `icon code: ${api.data.current.weather.ic}`;
    container.appendChild(p);

    console.log(api.data.current.pollution);

    p = document.createElement("p");
    p.innerHTML = `AQI: ${api.data.current.pollution.aqius}`;
    container.appendChild(p);
}

window.onload = getData;
