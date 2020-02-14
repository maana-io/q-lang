require("node-json-color-stringify");

const peg = require("pegjs");
const qlang = require("./grammar");

const parse = input => {
  try {
    const x = qlang.parse(input);
    return x;
  } catch (e) {
    if (!Object.keys(e).length) {
      console.log(`${e}\n`);
    } else {
      const badLine = e.location.start.line - 1;
      const badCol = e.location.start.column - 1;
      const lines = input.split("\n");

      console.log(`Syntax error at line: ${badLine}, column: ${badCol}\n`);
      console.log(lines[badLine]);
      console.log(" ".repeat(badCol) + "^");
      console.log(` ${JSON.colorStringify(e.message)}\n`);
    }
  }
};

module.exports = {
  parse
};
