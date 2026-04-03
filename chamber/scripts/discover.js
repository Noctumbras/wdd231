import {places} from '../data/places.mjs';
const placeCards = document.querySelector("#place-cards-div");
const welcomeBack = document.querySelector("#welcome-back");
const msToDays = 86400000;
const today = Date.now();
let lastVisited = Number(window.localStorage.getItem("lastVisited")) || 0;


function populatePlaceCards(places) {
    places.forEach((place) => {
        let card = document.createElement('section');
        let figure = document.createElement('figure');
        let image = document.createElement('img');
        let name = document.createElement('h2');
        let address = document.createElement('address');
        let description = document.createElement('p');
        let button = document.createElement('button');

        image.setAttribute('src', place.imageURL);
        image.setAttribute('alt', `image of ${place.name}`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '300');
        image.setAttribute('height', '200');
        figure.appendChild(image);

        name.textContent = place.name;
        address.textContent = place.address;
        description.textContent = place.description;
        button.textContent = "Learn More";

        card.appendChild(figure);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(description);
        card.appendChild(button);

        card.classList.add("place-card");
        placeCards.appendChild(card);
    });
}

if (lastVisited) {
    let daysSinceLastVisit = Math.floor((today - lastVisited) / msToDays);

    if (daysSinceLastVisit == 0) {
        welcomeBack.textContent = 'Back so soon! Awesome!';
    }
    else if (daysSinceLastVisit == 1) {
        welcomeBack.textContent = `You last visited 1 day ago.`;
    }
    else {
        welcomeBack.textContent = `You last visited ${daysSinceLastVisit} days ago.`;
    }
}

localStorage.setItem('lastVisited', today);
populatePlaceCards(places);