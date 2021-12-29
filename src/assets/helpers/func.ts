export const disabledAllPanels = (selectorsName: string): null => {
  const elements: NodeListOf<HTMLElement> = document.querySelectorAll(
    `.${selectorsName}`,
  )

  elements.forEach((element) => {
    const panel = element.nextElementSibling

    element.classList.remove('active')
    panel.classList.remove('active')

    // @ts-ignore: Unreachable code error
    panel.style.maxHeight = null
  })

  return null
}
