const membersData = "data/members.json";
const companyList = document.querySelector("#companies");

const gridViewButton = document.querySelector("#grid-view");
const columnViewButton = document.querySelector("#column-view");


function displayCompaniesGrid(companies) {
    companyList.innerHTML = '';
    companies.forEach((company) => {
        let card = document.createElement('section');
        let icon = document.createElement('img');
        let name = document.createElement('h2');
        let address = document.createElement('p');
        let phoneNumber = document.createElement('p');
        let websiteLink = document.createElement('a');

        icon.setAttribute('src', company.imageFile);
        icon.setAttribute('alt', `icon of ${company.name}`);
        icon.setAttribute('loading', 'lazy');
        icon.setAttribute('width', '340');
        icon.setAttribute('height', '440');
        name.textContent = company.name;
        address.textContent = company.address;
        phoneNumber.textContent = company.phoneNumber;
        websiteLink.setAttribute('href', '#');
        websiteLink.textContent = company.url;

        card.appendChild(icon);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phoneNumber);
        card.appendChild(websiteLink);

        companyList.appendChild(card);
    });
}

function displayCompaniesColumn(companies) {
    companyList.innerHTML = '';
    companies.forEach((company => {
        let row = document.createElement('section');
        let name = document.createElement('p');
        let address = document.createElement('p');
        let phoneNumber = document.createElement('p');
        let websiteLink = document.createElement('a');

        name.textContent = company.name;
        address.textContent = company.address;
        phoneNumber.textContent = company.phoneNumber;
        websiteLink.setAttribute('href', '#');
        websiteLink.textContent = company.url;

        row.appendChild(name);
        row.appendChild(address);
        row.appendChild(phoneNumber);
        row.appendChild(websiteLink);

        companyList.appendChild(row);
    }));
}

async function populateCompaniesGrid() {
    const response = await fetch(membersData);
    const data = await response.json();

    displayCompaniesGrid(data.companies);
}

async function populateCompaniesColumn() {
    const response = await fetch(membersData);
    const data = await response.json();

    displayCompaniesColumn(data.companies);
}

populateCompaniesGrid();

gridViewButton.addEventListener('click', () => {
    populateCompaniesGrid();
});

columnViewButton.addEventListener('click', () => {
    populateCompaniesColumn();
});