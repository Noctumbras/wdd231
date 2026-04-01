const formSummary = document.querySelector("#form-summary");
const params = new URLSearchParams(window.location.search);

let firstName = document.createElement('p');
let lastName = document.createElement('p');
let title = document.createElement('p');
let email = document.createElement('p');
let phone = document.createElement('p');
let business = document.createElement('p');
let membership = document.createElement('p');
let timestamp = document.createElement('p');

firstName.textContent = `First Name: ${params.get('first-name')}`;
lastName.textContent = `Last Name: ${params.get('last-name')}`;
title.textContent = `Organizational Title: ${params.get('organizational-title')}`;
email.textContent = `Email Address: ${params.get('email')}`;
phone.textContent = `Phone Number: ${params.get('phone-number')}`;
business.textContent = `Business/Organization Name: ${params.get('business-name')}`;
membership.textContent = `Membership Level: ${params.get('membership-level')}`;
timestamp.textContent = `Date of Submission: ${params.get('timestamp')}`;

formSummary.appendChild(firstName);
formSummary.appendChild(lastName);
formSummary.appendChild(title);
formSummary.appendChild(email);
formSummary.appendChild(phone);
formSummary.appendChild(business);
formSummary.appendChild(membership);
formSummary.appendChild(timestamp);