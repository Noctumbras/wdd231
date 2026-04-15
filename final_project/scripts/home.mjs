import { initializeNav } from "./nav.mjs";
import { initializeFooter } from "./footer.mjs";

const msToDays = 86400000;
const today = Date.now();
const rabbitDataURL = "data/daily_rabbits.json";
const dailyRabbitFact = document.querySelector("#rabbit-fact-card");
const dailyRabbitBreed = document.querySelector("#rabbit-breed-card");

const habitatButton = document.querySelector("#dropdown-button-habitat");
const habitatSection = document.querySelector("#dropdown-section-habitat");
const dietButton = document.querySelector("#dropdown-button-diet");
const dietSection = document.querySelector("#dropdown-section-diet");
const behaviorButton = document.querySelector("#dropdown-button-behavior");
const behaviorSection = document.querySelector("#dropdown-section-behavior");
const healthButton = document.querySelector("#dropdown-button-health");
const healthSection = document.querySelector("#dropdown-section-health");

async function getRabbitData() {
    try {
        const response = await fetch(rabbitDataURL);
        const data = await response.json();

        displayRabbitBreed(data);
        displayRabbitFact(data);
    } catch (error) {
        console.error("Error teching data:", error);
    }
}

function displayRabbitBreed(data) {
    let index = Math.floor(today / msToDays) % data.breeds.length;

    let image = document.createElement('img');
    let name = document.createElement('h3');
    let size = document.createElement('p');
    let description = document.createElement('p');

    name.textContent = data.breeds[index].name;
    size.textContent = `Size: ${data.breeds[index].sizeMin} - ${data.breeds[index].sizeMax} lbs`;
    description.textContent = data.breeds[index].description;

    image.setAttribute('src', data.breeds[index].imageURL);
    image.setAttribute('alt', `image of the rabbit breed ${data.breeds[index].name}`);
    image.setAttribute('loading', 'lazy');
    image.setAttribute('width', '300');
    image.setAttribute('height', '200');

    dailyRabbitBreed.appendChild(image);
    dailyRabbitBreed.appendChild(name);
    dailyRabbitBreed.appendChild(size);
    dailyRabbitBreed.appendChild(description);
}

function displayRabbitFact(data) {
    let index = Math.floor(today / msToDays) % data.facts.length;

    let fact = document.createElement('p');
    fact.textContent = data.facts[index];
    dailyRabbitFact.appendChild(fact);
}

habitatButton.addEventListener('click', () => {
        habitatSection.classList.toggle('show');
        habitatButton.classList.toggle('show');
});
dietButton.addEventListener('click', () => {
        dietSection.classList.toggle('show');
        dietButton.classList.toggle('show');
});
behaviorButton.addEventListener('click', () => {
        behaviorSection.classList.toggle('show');
        behaviorButton.classList.toggle('show');
});
healthButton.addEventListener('click', () => {
        healthSection.classList.toggle('show');
        healthButton.classList.toggle('show');
});



initializeNav();
initializeFooter();
getRabbitData();