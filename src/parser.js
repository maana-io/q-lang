const peg = require("pegjs");
// const nearley = require("nearley");
const qlang = require("./grammar");

const parse = input => {
  const x = qlang.parse(input);
  return x;
  // const parser = new nearley.Parser(nearley.Grammar.fromCompiled(qlang));
  // parser.feed(input);
  // return parser.results;
};

module.exports = {
  parse
};
