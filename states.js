const urlStates =
    "https://api.airvisual.com/v2/states?country=INDIA&key=a3765a9b-e91c-4fc7-9b0e-0992e69410f0";

async function getStates() {
    const response = await fetch(urlStates);
    const processedResponse = await response.json();

    console.log(processedResponse);
}

window.onload = getStates();
