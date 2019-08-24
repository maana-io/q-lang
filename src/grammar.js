// Generated automatically by nearley, version 2.18.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const moo = require('moo')

let lexer = moo.compile({
  space:      {match: /\s+/, lineBreaks: true},
  identifier: /[a-zA-Z][a-zA-Z0-9_\-.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+/,
  number:     /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,
  string:     /"(?:\\["bfnrt\/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/,
  service:    "service",
  type:       "type"
})
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "input", "symbols": ["_", "head", "_", "body", "_"], "postprocess":  d => {
          console.log('d', d)
          return d
        }},
    {"name": "head", "symbols": ["service"], "postprocess": d => d[0]},
    {"name": "body", "symbols": ["type"], "postprocess": d => d[0]},
    {"name": "service", "symbols": [{"literal":"service"}, "_", "identifier"], "postprocess":  d => 
        ({
          type: "service",
          id: d[2]
        })
            },
    {"name": "type", "symbols": [{"literal":"type"}, "_", "identifier"], "postprocess":  d => 
        ({
          type: "type",
          name: d[2]
        })
            },
    {"name": "identifier", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": d => d[0].value},
    {"name": "number", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": (d) => parseFloat(d[0].value)},
    {"name": "string", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": (d) => JSON.parse(d[0].value)},
    {"name": "_", "symbols": []},
    {"name": "_", "symbols": [(lexer.has("space") ? {type: "space"} : space)], "postprocess": () => null}
]
  , ParserStart: "input"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
