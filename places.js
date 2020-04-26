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
    } else {
        console.log("error");
    }
}

// Display data

/**
 * Create a button that will create the data for multiple
 * states.
 */
