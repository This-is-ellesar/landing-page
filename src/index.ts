import './style/main.scss';

const burgerMenu: HTMLButtonElement = document.querySelector('#burger');
const listMenu: HTMLElement = document.querySelector('#nav');

burgerMenu.addEventListener('click', () => {
  listMenu.classList.toggle('nav-active');
});
