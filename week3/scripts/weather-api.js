const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.74&lon=6.63&units=imperial&appid=d508e21adb0389f533688cfdcbb4ff3c';


async function apiFetch () {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
        }
        else {
            throw Error(await response.text());
        }

    } catch (error) {
        console.log(error);
    }
}

apiFetch();