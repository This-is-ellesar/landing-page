export const disabledAllPanels = (selectorsName: string): null => {
  const elements: NodeListOf<HTMLElement> = document.querySelectorAll(
    `.${selectorsName}`,
  )

  elements.forEach((element) => {
    const panel = element.nextElementSibling
    const arrow = element.lastElementChild

    element.classList.remove('active')
    panel.classList.remove('active')
    arrow.classList.remove('active')

    // @ts-ignore: Unreachable code error
    panel.style.maxHeight = null
  })

  return null
}
