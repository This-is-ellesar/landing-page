import './style/main.scss';

// variables
const burgerMenu: HTMLButtonElement = document.querySelector('#burger');
const listMenu: HTMLElement = document.querySelector('#nav');

// listeners
burgerMenu.addEventListener('click', function (): void {
  this.classList.toggle('opened');
  listMenu.classList.toggle('nav-active');
});
