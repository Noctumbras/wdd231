const membersData = "data/members.json";
const companyGrid = document.querySelector("#companies-grid");
const companyList = document.querySelector("#companies-list");

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
        companyGrid.appendChild(card);
    });
}

function displayCompaniesColumn(companies) {
    companyList.innerHTML = '';
    companies.forEach((company => {
        let row = document.createElement('section');
        let nameLink = document.createElement('a');
        let address = document.createElement('p');
        let phoneNumber = document.createElement('p');
        let membershipLevel = document.createElement('p');

        nameLink.setAttribute('href', '#');
        nameLink.textContent = company.name;
        address.textContent = company.address;
        phoneNumber.textContent = company.phoneNumber;

        if (company.membershipLevel == 3) {
            membershipLevel.textContent = "Gold";
        }
        else if (company.membershipLevel == 2) {
            membershipLevel.textContent = "Silver";
        }
        else {
            membershipLevel.textContent = "Bronze";
        }

        row.appendChild(nameLink);
        row.appendChild(address);
        row.appendChild(phoneNumber);
        row.appendChild(membershipLevel);

        row.classList.add("list-card");
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
populateCompaniesColumn();

gridViewButton.addEventListener('click', () => {
    companyGrid.classList.remove('hide');
    companyList.classList.remove('show');
});

columnViewButton.addEventListener('click', () => {
    companyGrid.classList.add('hide');
    companyList.classList.add('show');
});