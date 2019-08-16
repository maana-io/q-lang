const fs = require("mz/fs")
const path = require("path")

/**
 * 
 */
const generate = ast => {

}

const generateFromFile = async astFilename => {
  console.log("gen::Reading:", astFilename)
  const input = (await fs.readFile(astFilename)).toString()
  console.log("gen::Parsing:", astFilename)
  const ast = JSON.parse(input)
  const gqlFilename = path.basename(astFilename, ".ast") + ".gql"
  console.log("gen::Writing:", gqlFilename)
  await fs.writeFile(gqlFilename, JSON.stringify(ast))
  return gqlFilename
}

module.exports = {
  generateFromFile,
  generate
}