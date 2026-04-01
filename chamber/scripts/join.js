const currentDate = new Date();
const timestamp = document.querySelector("#timestamp");

const nonprofitButtonOpen = document.querySelector("#non-profit-modal-open");
const bronzeButtonOpen = document.querySelector("#bronze-modal-open");
const silverButtonOpen = document.querySelector("#silver-modal-open");
const goldButtonOpen = document.querySelector("#gold-modal-open");

const nonprofitButtonClose = document.querySelector("#non-profit-modal-close");
const bronzeButtonClose = document.querySelector("#bronze-modal-close");
const silverButtonClose = document.querySelector("#silver-modal-close");
const goldButtonClose = document.querySelector("#gold-modal-close");

const nonprofitModal = document.querySelector("#non-profit-modal");
const bronzeModal = document.querySelector("#bronze-modal");
const silverModal = document.querySelector("#silver-modal");
const goldModal = document.querySelector("#gold-modal");

timestamp.setAttribute('value', currentDate.toString());


nonprofitButtonOpen.addEventListener('click', () => {
    nonprofitModal.showModal();
});
nonprofitButtonClose.addEventListener('click', () => {
    nonprofitModal.close();
});

bronzeButtonOpen.addEventListener('click', () => {
    bronzeModal.showModal();
});
bronzeButtonClose.addEventListener('click', () => {
    bronzeModal.close();
});

silverButtonOpen.addEventListener('click', () => {
    silverModal.showModal();
});
silverButtonClose.addEventListener('click', () => {
    silverModal.close();
});

goldButtonOpen.addEventListener('click', () => {
    goldModal.showModal();
});
goldButtonClose.addEventListener('click', () => {
    goldModal.close();
});