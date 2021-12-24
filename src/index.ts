import './style/main.scss'

// variables
const burgerMenu: HTMLButtonElement = document.querySelector('#burger')
const listMenu: HTMLElement = document.querySelector('#nav')
const orderDialog: HTMLDialogElement = document.querySelector('#orderDialog')
const appointmentButton: HTMLButtonElement =
  document.querySelector('#appointment')

// listeners
burgerMenu.addEventListener('click', function (): void {
  this.classList.toggle('opened')
  listMenu.classList.toggle('nav-active')
})

appointmentButton.addEventListener('click', () => {
  orderDialog.classList.add('dialog--show')
})
