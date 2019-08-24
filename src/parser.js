const nearley = require("nearley");
const grammar = require("./grammar");

const parse = input => {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  parser.feed(input)
  return parser.results
}

module.exports = {
  parse
}