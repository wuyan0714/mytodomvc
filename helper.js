const fs = require('fs/promises');

exports.readFileJSON = async fileName => (
  JSON.parse(await fs.readFile(fileName, 'utf8'))
)

exports.writeFileJSON = async (fileName, data) =>( 
  await fs.writeFile(fileName, JSON.stringify(data))
)

// module.exports = {readFileJSON, writeFileJSON}

