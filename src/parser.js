const nearley = require("nearley");
const qlang = require("./qlangGrammar");

const parse = input => {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(qlang));
  parser.feed(input);
  return parser.results;
};

module.exports = {
  parse
};
