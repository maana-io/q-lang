# http://www.json.org/
# http://www.asciitable.com/
@{%

const moo = require('moo')

let lexer = moo.compile({
  space:      {match: /\s+/, lineBreaks: true},
  identifier: /[a-zA-Z][a-zA-Z0-9_\-.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+/,
  number:     /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,
  string:     /"(?:\\["bfnrt\/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/,
  service:    "service"
})

%}

@lexer lexer

input -> service {% id %}

service -> "service" _ identifier _ {% d => d[2] %}

identifier -> %identifier {% (d) => d[0].value %}

number -> %number {% (d) => parseFloat(d[0].value) %}

string -> %string {% (d) => JSON.parse(d[0].value) %}

_ -> null | %space {% () => null %}