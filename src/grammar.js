// Generated automatically by nearley, version 2.18.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }


const moo = require('moo')

let lexer = moo.compile({
    id: /[a-zA-Z0-9]+/,
    space: {match: /\s+/, lineBreaks: true},
    number: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,
    string: /"(?:\\["bfnrt\/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/,
    '{': '{',
    '}': '}',
    '[': '[',
    ']': ']',
    '<': '<',
    '>': '>',
    '(': '(',
    ')': ')',
    ',': ',',
    ':': ':',
    '=': '=',
    '=>': '=>',
    true: 'true',
    false: 'false',
    null: 'null',
    type: 'type'
})

var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "start$ebnf$1", "symbols": []},
    {"name": "start$ebnf$1", "symbols": ["start$ebnf$1", "type_def"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "start", "symbols": ["start$ebnf$1", "_"], "postprocess": d => d[0]},
    {"name": "type_def", "symbols": ["_", {"literal":"type"}, "_", "con_type"], "postprocess": d => d[3]},
    {"name": "con_type$ebnf$1", "symbols": ["con_block"], "postprocess": id},
    {"name": "con_type$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "con_type", "symbols": ["identifier", "con_type$ebnf$1", "field_block"], "postprocess": d => ({ id: d[0], type_parameters: d[1], fields: d[2] })},
    {"name": "con_block$ebnf$1", "symbols": ["cons"]},
    {"name": "con_block$ebnf$1", "symbols": ["con_block$ebnf$1", "cons"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "con_block", "symbols": ["_", {"literal":"<"}, "con_block$ebnf$1", "_", {"literal":">"}], "postprocess": d => d[2]},
    {"name": "cons", "symbols": ["_", "identifier"], "postprocess": d => ({ type: d[1] })},
    {"name": "cons", "symbols": ["_", "identifier", "_", {"literal":"="}, "_", "identifier"], "postprocess": d => ({ type: d[1], extends: d[5] })},
    {"name": "field_block$ebnf$1", "symbols": []},
    {"name": "field_block$ebnf$1", "symbols": ["field_block$ebnf$1", "field"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "field_block", "symbols": ["_", {"literal":"{"}, "field_block$ebnf$1", "_", {"literal":"}"}], "postprocess": d => d[2]},
    {"name": "field", "symbols": ["_", "identifier", "_", {"literal":":"}, "_", "identifier"], "postprocess": d => ({ name: d[1], type: d[5] })},
    {"name": "identifier", "symbols": [(lexer.has("id") ? {type: "id"} : id)], "postprocess": d => d[0].value},
    {"name": "_", "symbols": []},
    {"name": "_", "symbols": [(lexer.has("space") ? {type: "space"} : space)], "postprocess": () => null}
]
  , ParserStart: "start"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
