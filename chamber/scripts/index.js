const membersData = "data/members.json";
const spotlightSection = document.querySelector("#spotlights");
const currentWeather = document.querySelector("#current-weather");
const weatherForecast = document.querySelector("#weather-forecast");
const weatherToday = 'https://api.openweathermap.org/data/2.5/weather?lat=34.37&lon=-80.07&units=imperial&appid=d508e21adb0389f533688cfdcbb4ff3c';
const forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=34.37&lon=-80.07&units=imperial&appid=d508e21adb0389f533688cfdcbb4ff3c';

// weather functions
async function currentWeatherFetch () {
    try {
        const response = await fetch(weatherToday);
        if (response.ok) {
            const data = await response.json();
            console.log(data);

            fillWeather(data);
        }
        else {
            throw Error(await response.text());
        }

    } catch (error) {
        console.log(error);
    }
}

function fillWeather(data) {
    let icon = document.createElement('img');
    let temp = document.createElement('p');
    let condition = document.createElement('p');
    let highTemp = document.createElement('p');
    let lowTemp = document.createElement('p');
    let humidity = document.createElement('p');

    let sunrise = document.createElement('p');
    let sunset = document.createElement('p');

    icon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    icon.setAttribute('alt', `icon representing current weather`);
    icon.setAttribute('loading', 'lazy');
    icon.setAttribute('width', '100');
    icon.setAttribute('height', '100');
    temp.textContent = `${data.main.temp}° F`;
    condition.textContent = data.weather[0].main;
    highTemp.textContent = `High: ${data.main.temp_max}° F`;
    lowTemp.textContent = `Low: ${data.main.temp_min}° F`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;

    let time = new Date(data.sys.sunrise);
    sunrise.textContent = `Sunrise: ${time.getHours()}:${time.getMinutes()} AM`;
    time.setMilliseconds(data.sys.sunset);
    sunset.textContent = `Sunset: ${time.getHours() - 12}:${time.getMinutes()} PM`;

    currentWeather.appendChild(icon);
    currentWeather.appendChild(temp);
    currentWeather.appendChild(condition);
    currentWeather.appendChild(highTemp);
    currentWeather.appendChild(lowTemp);
    currentWeather.appendChild(humidity);
    currentWeather.appendChild(sunrise);
    currentWeather.appendChild(sunset);
}

async function forecastFetch () {
    try {
        const response = await fetch(forecastURL);
        if (response.ok) {
            const data = await response.json();
            console.log(data);

            fillForecast(data);
        }
        else {
            throw Error(await response.text());
        }

    } catch (error) {
        console.log(error);
    }
}

function fillForecast(data) {
    let dayOfWeek = new Date().getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day1 = document.createElement('p');
    let day2 = document.createElement('p');
    let day3 = document.createElement('p');
    let day1Data = data.list[6];
    let day2Data = data.list[14];
    let day3Data = data.list[22];

    dayOfWeek += 1;
    if (dayOfWeek > 6) {
        dayOfWeek -= 7;
    }

    day1.textContent = `${days[dayOfWeek]}: ${day1Data.main.temp}° F`;
    
    dayOfWeek += 1;
    if (dayOfWeek > 6) {
        dayOfWeek -= 7;
    }
    day2.textContent = `${days[dayOfWeek]}: ${day2Data.main.temp}° F`;

    dayOfWeek += 1;
    if (dayOfWeek > 6) {
        dayOfWeek -= 7;
    }
    day3.textContent = `${days[dayOfWeek]}: ${day3Data.main.temp}° F`;

    weatherForecast.appendChild(day1);
    weatherForecast.appendChild(day2);
    weatherForecast.appendChild(day3);
}


// business spotlight functions
function fillSpotlights(companies) {

    companies.forEach((company) => {
        let card = document.createElement('section');
        let icon = document.createElement('img');
        let name = document.createElement('h2');
        let address = document.createElement('p');
        let phoneNumber = document.createElement('p');
        let membershipLevel = document.createElement('p');
        let websiteLink = document.createElement('a');

        icon.setAttribute('src', company.imageFile);
        icon.setAttribute('alt', `icon of ${company.name}`);
        icon.setAttribute('loading', 'lazy');
        icon.setAttribute('width', '340');
        icon.setAttribute('height', '440');
        name.textContent = company.name;
        address.textContent = company.address;
        phoneNumber.textContent = company.phoneNumber;

        if (company.membershipLevel == 3) {
            membershipLevel.textContent = "Membership Level: Gold";
        }
        else if (company.membershipLevel == 2) {
            membershipLevel.textContent = "Membership Level: Silver";
        }
        else {
            membershipLevel.textContent = "Membership Level: Bronze";
        }

        websiteLink.setAttribute('href', '#');
        websiteLink.textContent = company.url;

        card.appendChild(icon);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phoneNumber);
        card.appendChild(membershipLevel);
        card.appendChild(websiteLink);

        card.classList.add("grid-card");
        spotlightSection.appendChild(card);
    });
}

async function populateSpotlights() {
    const response = await fetch(membersData);
    const data = await response.json();
    const companies = data.companies;

    let numCompanies = companies.length;
    let randomSpotlight1 = Math.floor(Math.random() * numCompanies);

    while (companies[randomSpotlight1].membershipLevel < 2) {
        randomSpotlight1 = Math.floor(Math.random() * numCompanies);
    }

    let randomSpotlight2 = Math.floor(Math.random() * numCompanies);

    while (randomSpotlight1 == randomSpotlight2 || companies[randomSpotlight2].membershipLevel < 2) {
        randomSpotlight2 = Math.floor(Math.random() * numCompanies);
    } 

    const spotlightedCompanies = [companies[randomSpotlight1], companies[randomSpotlight2]];

    fillSpotlights(spotlightedCompanies);
}

populateSpotlights();
currentWeatherFetch();
forecastFetch();