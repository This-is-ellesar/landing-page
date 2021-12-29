import './style/main.scss'
// heplers
import { disabledAllPanels } from './helpers/func'

// variables
const burgerMenu: HTMLButtonElement = document.querySelector('#burger')
const listMenu: HTMLElement = document.querySelector('#nav')
const orderDialog: HTMLDialogElement = document.querySelector('#orderDialog')
const appointmentButton: HTMLButtonElement =
  document.querySelector('#appointment')
const closeDialog: HTMLButtonElement = document.querySelector('#closeDialog')
const overlayDialog: HTMLDivElement = document.querySelector('#overlayDialog')
const navLinks = document.querySelectorAll('#nav a')
const accordion = document.querySelectorAll('.accordion')
const accordionArrow = document.querySelectorAll('.accordion__arrow')

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

burgerMenu.addEventListener('click', function (): void {
  this.classList.toggle('opened')
  listMenu.classList.toggle('nav-active')
})

appointmentButton.addEventListener('click', (): void => {
  orderDialog.classList.add('dialog--active')
})

closeDialog.addEventListener('click', (): void => {
  orderDialog.classList.remove('dialog--active')
})

overlayDialog.addEventListener('click', (): void => {
  orderDialog.classList.remove('dialog--active')
})
