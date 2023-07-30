const fs = require('fs').promises

async function WriteTo(filename, content) {
  return fs.writeFile(filename, content, 'utf8')
}

async function ReadFrom(filename) {
  return fs.readFile(filename, 'utf8')
}

module.exports = {WriteTo, ReadFrom}
