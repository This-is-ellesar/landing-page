import './style/main.scss'
// helpers
import { disabledAllPanels } from './helpers/func'

// variables
const burgerMenu: HTMLButtonElement = document.querySelector('#burger')
const listMenu: HTMLElement = document.querySelector('#nav')
const orderDialog: HTMLElement = document.querySelector('#orderDialog')
const priceDialog: HTMLElement = document.querySelector('#priceDialog')
const appointmentButton: NodeListOf<HTMLElement> =
  document.querySelectorAll('.appointment')
const appointmentPriceButton: HTMLElement = document.querySelector('.appointment-price')
const priceButton: HTMLElement = document.querySelector('.price')
const closeDialog: HTMLButtonElement = document.querySelector('#closeDialog')
const closePriceDialog: HTMLButtonElement = document.querySelector('#closePriceDialog')
const overlayDialog: HTMLDivElement = document.querySelector('#overlayDialog')
const navLinks = document.querySelectorAll('#nav a')
const accordion = document.querySelectorAll('.accordion')

// listeners
navLinks.forEach((link: HTMLLinkElement): void => {
  link.addEventListener('click', () => {
    orderDialog.classList.remove('dialog--active')
    console.log(link.getAttribute('data-href'))
    document
      .querySelector(`#${link.getAttribute('data-href')}`)
      .scrollIntoView({ block: 'center', behavior: 'smooth' })
  })
})

accordion.forEach((button) => {
  button.addEventListener('click', function (): void {
    const panel: HTMLElement = this.nextElementSibling
    const arrow: HTMLImageElement = this.lastElementChild

    if (!this.classList.contains('active')) {
      disabledAllPanels('accordion')
    }

    this.classList.toggle('active')
    arrow.classList.toggle('active')

    panel.style.maxHeight = panel.style.maxHeight
      ? null
      : panel.scrollHeight + 'px'
  })
})

appointmentPriceButton.addEventListener('click', () => {
  priceDialog.classList.remove('dialog--active')
  orderDialog.classList.add('dialog--active')
})

priceButton.addEventListener('click', () => {
  priceDialog.classList.add('dialog--active')
})

burgerMenu.addEventListener('click', function (): void {
  this.classList.toggle('opened')
  listMenu.classList.toggle('nav-active')
})

appointmentButton.forEach(button => {
  button.addEventListener('click', (): void => {
    orderDialog.classList.add('dialog--active')
  })
})

closeDialog.addEventListener('click', (): void => {
  orderDialog.classList.remove('dialog--active')
})

closePriceDialog.addEventListener('click', (): void => {
  priceDialog.classList.remove('dialog--active')
})

overlayDialog.addEventListener('click', (): void => {
  orderDialog.classList.remove('dialog--active')
})
