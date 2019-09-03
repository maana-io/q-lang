// Generated automatically by nearley, version 2.19.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }


const moo = require('moo')

let lexer = moo.compile({
    // Literals
    '{': '{',
    '}': '}',
    '[': '[',
    ']': ']',
    '<': '<',
    '>': '>',
    '(': '(',
    ')': ')',
    '@': '@',
    '&': '&',
    ',': ',',
    ':': ':',
    '=': '=',
    '=>': '=>',
    TRUE: 'true',
    FALSE: 'false',
    NULL: 'null',
    SERVICE: 'service',
    ID: 'id',
    NAME: 'name',
    DESCRIPTION: 'description',
    IMPORT: 'import',
    AS: 'as',
    INCLUDE: 'include',
    INTERFACE: 'interface',
    TYPE: 'type',
    IMPLEMENTS: 'implements',
    FUNCTION: 'function',
    // Regular expressions
    WS: {match: /\s+/, lineBreaks: true},
    COMMENT: /\#.*/,
    WORD: /[\-\.\w\?\+]+/,
    NUMBER: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,
    STRING: /"(?:\\["bfnrt\/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/,
})



const mkObjectFromPairs = pairs => {
  const obj = {}
  pairs.forEach(x => obj[Object.keys(x)[0]] = Object.values(x)[0] )
  return obj
}

const mkObjectFromCollections = cols => {
  if (!cols) return
  const obj = {}
  cols.forEach(x => {
    const key = Object.keys(x)[0]
    const value = x[key]
    let col = obj[key]
    if (!col) {
      col = obj[key] = []
    }
    col.push(value)
  })
  return obj
}
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "start$ebnf$1", "symbols": ["statements"], "postprocess": id},
    {"name": "start$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "start$ebnf$2", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": id},
    {"name": "start$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "start", "symbols": ["_", "service_directive", "_", "start$ebnf$1", "_", "start$ebnf$2"], "postprocess": d => Object.assign({}, d[1], mkObjectFromCollections(d[3]))},
    {"name": "service_directive", "symbols": [{"literal":"@"}, "_", (lexer.has("SERVICE") ? {type: "SERVICE"} : SERVICE), "_", {"literal":"("}, "_", "service_directive_args", "_", {"literal":")"}], "postprocess": d => ({ service: mkObjectFromPairs(d[6]) })},
    {"name": "service_directive_args", "symbols": ["service_directive_arg"], "postprocess": d => [d[0]]},
    {"name": "service_directive_args", "symbols": ["service_directive_args", "ws", "service_directive_arg"], "postprocess": d => [...d[0], d[2]]},
    {"name": "service_directive_arg", "symbols": ["id_arg"], "postprocess": id},
    {"name": "service_directive_arg", "symbols": ["name_arg"], "postprocess": id},
    {"name": "service_directive_arg", "symbols": ["description_arg"], "postprocess": id},
    {"name": "statements", "symbols": ["statement"], "postprocess": d => [d[0]]},
    {"name": "statements", "symbols": ["statements", "ws", "statement"], "postprocess": d=> [...d[0], d[2]]},
    {"name": "statement", "symbols": ["import_statement"], "postprocess": id},
    {"name": "statement", "symbols": ["include_statement"], "postprocess": id},
    {"name": "statement", "symbols": ["interface_statement"], "postprocess": id},
    {"name": "statement", "symbols": ["type_statement"], "postprocess": id},
    {"name": "statement", "symbols": ["function_statement"], "postprocess": id},
    {"name": "import_statement$ebnf$1", "symbols": ["import_as"], "postprocess": id},
    {"name": "import_statement$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "import_statement$ebnf$2", "symbols": ["import_selector_block"], "postprocess": id},
    {"name": "import_statement$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "import_statement", "symbols": [(lexer.has("IMPORT") ? {type: "IMPORT"} : IMPORT), "ws", (lexer.has("WORD") ? {type: "WORD"} : WORD), "import_statement$ebnf$1", "import_statement$ebnf$2"], "postprocess": d => ({ imports: { service: d[2].value, alias: d[3], selectors: d[4] }})},
    {"name": "import_as", "symbols": ["ws", (lexer.has("AS") ? {type: "AS"} : AS), "ws", (lexer.has("WORD") ? {type: "WORD"} : WORD)], "postprocess": d => d[3].value},
    {"name": "import_selector_block$ebnf$1", "symbols": ["import_selectors"], "postprocess": id},
    {"name": "import_selector_block$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "import_selector_block", "symbols": ["_", {"literal":"{"}, "import_selector_block$ebnf$1", "_", {"literal":"}"}], "postprocess": d => d[2]},
    {"name": "import_selectors", "symbols": ["import_selector"], "postprocess": d => [d[0]]},
    {"name": "import_selectors", "symbols": ["import_selectors", "ws", "import_selector"], "postprocess": d => [...d[0], d[2]]},
    {"name": "import_selector", "symbols": ["_", (lexer.has("WORD") ? {type: "WORD"} : WORD)], "postprocess": d => d[1].value},
    {"name": "include_statement", "symbols": [(lexer.has("INCLUDE") ? {type: "INCLUDE"} : INCLUDE), "ws", (lexer.has("WORD") ? {type: "WORD"} : WORD)], "postprocess": d => ({ includes: d[2].value })},
    {"name": "interface_statement", "symbols": [(lexer.has("INTERFACE") ? {type: "INTERFACE"} : INTERFACE), "ws", (lexer.has("WORD") ? {type: "WORD"} : WORD)], "postprocess": d => ({ interfaces: d[2].value })},
    {"name": "type_statement", "symbols": [(lexer.has("TYPE") ? {type: "TYPE"} : TYPE), "ws", (lexer.has("WORD") ? {type: "WORD"} : WORD)], "postprocess": d => ({ types: d[2].value })},
    {"name": "function_statement", "symbols": [(lexer.has("FUNCTION") ? {type: "FUNCTION"} : FUNCTION), "ws", (lexer.has("WORD") ? {type: "WORD"} : WORD)], "postprocess": d => ({ functions: d[2].value })},
    {"name": "id_arg", "symbols": [(lexer.has("ID") ? {type: "ID"} : ID), "_", {"literal":":"}, "_", (lexer.has("STRING") ? {type: "STRING"} : STRING)], "postprocess": d => ({ id: d[4].value })},
    {"name": "name_arg", "symbols": [(lexer.has("NAME") ? {type: "NAME"} : NAME), "_", {"literal":":"}, "_", (lexer.has("STRING") ? {type: "STRING"} : STRING)], "postprocess": d => ({ name: d[4].value })},
    {"name": "description_arg", "symbols": [(lexer.has("DESCRIPTION") ? {type: "DESCRIPTION"} : DESCRIPTION), "_", {"literal":":"}, "_", (lexer.has("STRING") ? {type: "STRING"} : STRING)], "postprocess": d => ({ description: d[4].value })},
    {"name": "_$ebnf$1", "symbols": ["ws"], "postprocess": id},
    {"name": "_$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "ws", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "ws$ebnf$1", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": id},
    {"name": "ws$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ws", "symbols": ["ws$ebnf$1", (lexer.has("COMMENT") ? {type: "COMMENT"} : COMMENT), "_"]}
]
  , ParserStart: "start"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
