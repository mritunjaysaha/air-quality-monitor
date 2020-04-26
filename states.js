const urlStates =
    "https://api.airvisual.com/v2/states?country=INDIA&key=a3765a9b-e91c-4fc7-9b0e-0992e69410f0";

const dataOfStates = {
    Assam: ["Guwahati", "Tezpur", "Dibrughar", "Silchar"],
    Meghalaya: ["Shillong", "Tura", "Cherrapunji", "Williamnagar"],
    "Andhra Pradesh": ["Amaravati", "Rajamahendravaram", "Tirupati"],
    Bihar: ["Gaya", "Muzaffarpur"],
    Delhi: [
        "Alipur",
        "Bawana",
        "Defence Colony",
        "Delhi",
        "Deoli",
        "Karol Bagh",
        "New Delhi",
        "Pitampura",
        "Shahdara",
    ],
    Gujarat: [
        "Adalaj",
        "Ahmedabad",
        "Ankleshwar",
        "Ghandinagar",
        "Naroda",
        "Sarkhej",
        "Vapi",
    ],
    Haryana: [
        "Ambala",
        "Bahadurgarh",
        "Bhiwani",
        "Dharuhera",
        "Faridabad",
        "Fatehabad",
        "Firozpur Jhirka",
        "Gharaunda",
        "Gurugram",
        "Hisar",
        "Jind",
        "Kaithal",
        "Narnaul",
        "Palwal",
        "Panchkula",
        "Rohtak",
        "Sirsa",
        "Sonipat",
        "Thanesar",
        "Yamunanagar",
    ],
    Jharkhand: ["Jorapokhar"],
    Karnataka: [
        "Bengaluru",
        "Chik Ballapur",
        "Closepet",
        "Gulbarga",
        "Hoskote",
        "Mysore",
        "Yadgir",
        "Yelahanka",
    ],
    Kerala: ["Elur", "Thiruvananthapuram"],
    "Madhya Pradesh": [
        "Bhopal",
        "Damoh",
        "Dewas",
        "Indore",
        "Jabalpur",
        "Maihar",
        "Mandideep",
        "Murwara",
        "Pithampur",
        "Ratlam",
        "Satna",
        "Ujjain",
    ],
    Maharashtra: [
        "Airoli",
        "Alandi",
        "Artist Village",
        "Aurangabad",
        "Borivli",
        "Chandrapur",
        "Kalyan",
        "Lohogaon",
        "Mumbai",
        "Nagpur",
        "Nashik",
        "Pimpri",
        "Powai",
        "Pune",
        "Shivaji Nagar",
        "Solapur",
        "Thane",
        "Uran",
        "Virar",
    ],
    Odisha: ["Brajrajnagar", "Talcher"],
};

console.log(Object.getOwnPropertyNames(dataOfStates));

listState(Object.getOwnPropertyNames(dataOfStates));
// document.getElementById("main-menu").onclick = function get(){

// }

async function getStates() {
    const response = await fetch(urlStates);
    const processedResponse = await response.json();
    const stateList = processedResponse.data;
    // createDataOfStates(stateList);
    listState(stateList);
}

function createDataOfStates(stateList) {
    for (let i = 0; i < stateList.length; i++) {
        let state = stateList[i].state;

        getCityName(state);
    }
}
async function getCityName(state) {
    const urlCities = `https://api.airvisual.com/v2/cities?state=${state}&country=INDIA&key=a3765a9b-e91c-4fc7-9b0e-0992e69410f0`;
    const response = await fetch(urlCities);
    console.log("state", state);

    const processedResponse = await response.json();

    console.log(processedResponse);
    createArrayOfCities(state, processedResponse);
}
function createArrayOfCities(state, cityList) {
    cityList = cityList.data;
    console.log(cityList.length);

    let arrayCities = [];
    for (let i = 0; i < cityList.length; i++) {
        console.log(cityList[i].city);
        arrayCities.push(cityList[i].city);
    }
    console.log(arrayCities);

    dataOfStates[`${state}`] = arrayCities;
    console.log("dataOfStates:", dataOfStates);

    // getSelectValue();
}

async function getCityData(state, city) {
    // const url =
    //     "https://api.airvisual.com/v2/city?city=Shillong&state=Meghalaya&country=INDIA&key=a3765a9b-e91c-4fc7-9b0e-0992e69410f0";

    // state = state + "";
    // city = city + "";
    // console.log("state: " + state);
    // console.log(typeof state);
    // console.log("city: " + city);
    // console.log(typeof city);
    const response = await fetch(
        `https://api.airvisual.com/v2/city?city=${city}&state=${state}&country=INDIA&key=a3765a9b-e91c-4fc7-9b0e-0992e69410f0`
    );

    // const response = await fetch(url);
    const processedResponse = await response.json();
    console.log("here", processedResponse);

    displayData(processedResponse);
}
function getSelectValue() {
    const state = document.getElementById("main-menu");
    const city = document.getElementById("sub-menu");
    console.log("state: ", state.value, "city: ", city.value);

    // console.log(typeof JSON.stringify(state));
    getCityData(state.value, city.value);
}
//------------------------------------------------------------------------s
async function getCities() {
    const state = "Delhi";
    const urlCities = `https://api.airvisual.com/v2/cities?state=${state}&country=INDIA&key=a3765a9b-e91c-4fc7-9b0e-0992e69410f0`;
    const response = await fetch(urlCities);
    const processedResponse = await response.json();

    console.log(processedResponse);

    getCityDetails();
}

// async function getCityDetails() {
//     const city = "Guwahati";
//     const state = "Assam";
//     // const country = "India";

//     const url = `https://api.airvisual.com/v2/city?city=${city}&state=${state}&country=INDIA&key=a3765a9b-e91c-4fc7-9b0e-0992e69410f0`;

//     const response = await fetch(url);
//     const processedResponse = await response.json();

//     console.log("getCityDetails: ", processedResponse);

//     displayData(processedResponse, "selected-city");
// }
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

    //get the ID of the container for the city name
    // const containerNearestCity = document.getElementById(id);

    //set the city name
    // const cityh3 = document.createElement("h3");
    // cityh3.innerHTML = city;
    // containerNearestCity.appendChild(cityh3);

    // //get the ID of the container for AQI
    // const containerAqi = document.getElementById("aqi");
    // //set the AQI
    // const aqih3 = document.createElement("h3");
    // aqih3.innerHTML = `AQI ${aqi}`;
    // containerAqi.appendChild(aqih3);

    // //get the ID of the container for weather
    // const containerWeather = document.getElementById("weather");

    // //set the weather deatails
    // const humidityp = document.createElement("p");
    // humidityp.innerHTML = `Humidity: ${humidity}`;
    // containerWeather.appendChild(humidityp);

    // const pressurep = document.createElement("p");
    // pressurep.innerHTML = `Pressure: ${pressure}`;
    // containerWeather.appendChild(pressurep);

    // const tempp = document.createElement("p");
    // tempp.innerHTML = `Temp: ${temp}`;
    // containerWeather.appendChild(tempp);
}
function listState(stateArr) {
    // console.log("here", stateArr[0].state);
    // let container = document.getElementById("states");
    // let ul = document.createElement("ul");
    // ul.className = "names";
    // if (stateArr.length > 0) {
    //     for (let i = 0; i < stateArr.length; i++) {
    //         let li = document.createElement("li");
    //         li.className = "collection-item";
    //         li.innerHTML = `<a href="#">${stateArr[i].state}</a>`;
    //         ul.appendChild(li);
    //         // console.log("here", ul);
    //         // console.log(stateArr[i].state);
    //     }
    //     container.appendChild(ul);
    // } else {
    //     console.log("empty");
    // }

    //Fill the select list with state data
    let main = document.getElementById("main-menu");
    let sub = document.getElementById("sub-menu");

    console.log(stateArr);
    for (let i = 0; i < stateArr.length; i++) {
        let option = document.createElement("option");
        option.value = stateArr[i];
        option.text = stateArr[i];
        main.appendChild(option);
        console.log(stateArr[i]);
    }

    main.addEventListener("change", function () {
        var selectedOption = dataOfStates[this.value];

        //Removing the sub menu option using while loop

        while (sub.options.length > 0) {
            sub.options.remove(0);
        }

        Array.from(selectedOption).forEach(function (el) {
            let option = new Option(el, el);

            sub.appendChild(option);
        });
    });
}

// window.onload = getStates();

// window.onload = getCities();
