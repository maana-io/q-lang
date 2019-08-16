const nearley = require("nearley");
const grammar = require("./grammar");
const fs = require("mz/fs")
const path = require("path")

/**
 * 
 */
const parse = input => {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

  try {
    parser.feed(input)
    console.log("Results: ", parser.results)
    return parser.results
  } catch (error) {
    console.log(error)
    throw error
  }

}

/**
 * 
 */
const parseFile = async (qFilename) => {
  console.log("parse::Reading:", qFilename)
  const input = (await fs.readFile(qFilename)).toString();
  console.log("parse::Parsing:", qFilename)
  const ast = parse(input)
  const astFilename = path.basename(qFilename, ".q") + ".ast"
  console.log("parse::Writing:", astFilename)
  await fs.writeFile(astFilename, JSON.stringify(ast))
  return astFilename
}

module.exports = {
  parseFile,
  parse
}