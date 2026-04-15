import { initializeNav } from "./nav.mjs";
import { initializeFooter } from "./footer.mjs";

const formSummary = document.querySelector("#form-summary");
const params = new URLSearchParams(window.location.search);

let name = document.createElement('p');
let email = document.createElement('p');
let question = document.createElement('p');

name.textContent = `Name: ${params.get('name')}`;
email.textContent = `Email Address: ${params.get('email')}`;
question.textContent = `${params.get('question')}`;

formSummary.appendChild(name);
formSummary.appendChild(email);
formSummary.appendChild(question);

initializeNav();
initializeFooter();