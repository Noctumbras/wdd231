const nav = document.querySelector('#nav-bar');
const navButton = document.querySelector('#nav-button');

navButton.addEventListener('click', () => {
    nav.classList.toggle('show');
    navButton.classList.toggle('show');
})