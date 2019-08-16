const parseArgs = require('minimist')
const parser = require("./parser");
const genQService = require("./genQService");

const main = async () => {
  const args = parseArgs(process.argv.slice(2))
  const inputFilename = args._[0]
  const astFilename = await parser.parseFile(inputFilename)
  const gqlFilename = await genQService.generateFromFile(astFilename)
}

main()