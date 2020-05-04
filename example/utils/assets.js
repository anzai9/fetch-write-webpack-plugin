let styleJson
let nameJson

try {
  styleJson = require('../../static/bundle/style.json')
  nameJson = require('../dist/name.json')
} catch (err) {
  console.error('[assets]Failed to required the file: ', err)
}

export { styleJson, nameJson }
