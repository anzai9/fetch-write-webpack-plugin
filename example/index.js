const { styleJson, nameJson } = require('./utils/assets')

function component() {
  const element = document.createElement('div')
  const childElement = document.createElement('div')
  const name = nameJson.name
  childElement.textContent = name
  const style = Object.keys(styleJson).reduce((style, key) => {
    style += `${key}:${styleJson[key]};`
    return style
  }, '')
  childElement.setAttribute('style', style)
  element.innerHTML = ['Hello', 'webpack']
  element.appendChild(childElement)

  return element
}

document.body.appendChild(component())
