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
    {"name": "start", "symbols": ["_"], "postprocess":  d => {
          console.log('start ->', JSON.stringify(d, null, 2))
          return Object.assign({}, d[1], mkObjectFromCollections(d[0])) 
        } },
    {"name": "words$ebnf$1", "symbols": []},
    {"name": "words$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("WORD") ? {type: "WORD"} : WORD)]},
    {"name": "words$ebnf$1", "symbols": ["words$ebnf$1", "words$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "words", "symbols": ["words$ebnf$1"], "postprocess": id},
    {"name": "service_directive", "symbols": [{"literal":"@"}, "_", (lexer.has("SERVICE") ? {type: "SERVICE"} : SERVICE), "_", {"literal":"("}, "service_directive_args", "_", {"literal":")"}], "postprocess": d =>({ service: mkObjectFromPairs(d[5]) })},
    {"name": "service_directive_args", "symbols": ["_", "service_directive_arg"], "postprocess": d => [d[1]]},
    {"name": "service_directive_args", "symbols": ["service_directive_args", "ws", "service_directive_arg"], "postprocess": d => [...d[0], d[2]]},
    {"name": "service_directive_arg", "symbols": ["id_arg"], "postprocess": id},
    {"name": "service_directive_arg", "symbols": ["name_arg"], "postprocess": id},
    {"name": "service_directive_arg", "symbols": ["description_arg"], "postprocess": id},
    {"name": "statements", "symbols": ["_", "statement"], "postprocess": d => { console.log("s", d); return [d[1]] }},
    {"name": "statements", "symbols": ["statements", "ws", "statement"], "postprocess": d=> { console.log("ss", d); return [...d[0], d[2]] }},
    {"name": "statement", "symbols": ["_"], "postprocess": d => { console.log('statement', d); return d[0] }},
    {"name": "statement", "symbols": ["service_directive"], "postprocess": id},
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
    {"name": "function_statement", "symbols": [(lexer.has("FUNCTION") ? {type: "FUNCTION"} : FUNCTION), "ws", "field"], "postprocess": d => ({ functions: d[2] })},
    {"name": "field", "symbols": [(lexer.has("WORD") ? {type: "WORD"} : WORD)], "postprocess": d => ({ name: d[0].value, args: d[1] })},
    {"name": "function_argument_block$ebnf$1", "symbols": ["arguments"], "postprocess": id},
    {"name": "function_argument_block$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "function_argument_block", "symbols": ["_", {"literal":"("}, "_", "function_argument_block$ebnf$1", "_", {"literal":")"}], "postprocess": d => d[3]},
    {"name": "arguments", "symbols": ["argument"], "postprocess": d => [d[0]]},
    {"name": "arguments", "symbols": ["arguments", "_", {"literal":","}, "_", "argument"], "postprocess": d => [...d[0], d[4]]},
    {"name": "argument", "symbols": ["_", (lexer.has("WORD") ? {type: "WORD"} : WORD), "_", {"literal":":"}, "_", "wrapped_type"], "postprocess": d => ({ arg: d[1].value, type: d[5] })},
    {"name": "wrapped_type$ebnf$1", "symbols": ["type_parameter_block"], "postprocess": id},
    {"name": "wrapped_type$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "wrapped_type", "symbols": [(lexer.has("WORD") ? {type: "WORD"} : WORD), "wrapped_type$ebnf$1"], "postprocess": d => ({ type: d[0].value, params: d[1] })},
    {"name": "wrapped_type", "symbols": ["wrapped_type", "_", {"literal":"!"}], "postprocess": d => ({ required: d[0] })},
    {"name": "wrapped_type", "symbols": [{"literal":"["}, "_", "wrapped_type", "_", {"literal":"]"}], "postprocess": d => ({ array: d[2] })},
    {"name": "type_parameter_block$ebnf$1", "symbols": ["type_parameters"], "postprocess": id},
    {"name": "type_parameter_block$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "type_parameter_block", "symbols": ["_", {"literal":"<"}, "type_parameter_block$ebnf$1", "ws", {"literal":">"}]},
    {"name": "type_parameters", "symbols": ["type_parameter"], "postprocess": d => [d[0]]},
    {"name": "type_parameters", "symbols": ["type_parameters", "_", {"literal":","}, "_", "type_parameter"], "postprocess": d => [...d[0], d[4]]},
    {"name": "type_parameter", "symbols": [(lexer.has("WORD") ? {type: "WORD"} : WORD)], "postprocess": d => d[0].value},
    {"name": "id_arg", "symbols": [(lexer.has("ID") ? {type: "ID"} : ID), "_", {"literal":":"}, "_", (lexer.has("STRING") ? {type: "STRING"} : STRING)], "postprocess": d => ({ id: d[4].value })},
    {"name": "name_arg", "symbols": [(lexer.has("NAME") ? {type: "NAME"} : NAME), "_", {"literal":":"}, "_", (lexer.has("STRING") ? {type: "STRING"} : STRING)], "postprocess": d => ({ name: d[4].value })},
    {"name": "description_arg", "symbols": [(lexer.has("DESCRIPTION") ? {type: "DESCRIPTION"} : DESCRIPTION), "_", {"literal":":"}, "_", (lexer.has("STRING") ? {type: "STRING"} : STRING)], "postprocess": d => ({ description: d[4].value })},
    {"name": "_$ebnf$1", "symbols": ["ws"], "postprocess": id},
    {"name": "_$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": d => { console.log('_', d); return null }},
    {"name": "ws", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": d => { console.log('%WS', d); return null }},
    {"name": "ws$ebnf$1", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": id},
    {"name": "ws$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ws", "symbols": ["ws$ebnf$1", (lexer.has("COMMENT") ? {type: "COMMENT"} : COMMENT), "_"], "postprocess": d => { console.log('comment', d); return ({ comment: d[1].value }) }}
]
  , ParserStart: "start"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
