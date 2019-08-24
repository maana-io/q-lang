#
# Lexer
# =====
#

@{%
const moo = require('moo')

let lexer = moo.compile({
  space:      {match: /\s+/, lineBreaks: true},
  identifier: /[a-zA-Z][a-zA-Z0-9_\-.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+/,
  number:     /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,
  string:     /"(?:\\["bfnrt\/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/,
  service:    "service",
  type:       "type"
})
%}

#
# Grammar
# =======
#
@lexer lexer

input
  -> _ head _ body _ {% d => {
    console.log('input:', d)
    return d
  }  %}

head
  -> service {% d => {
    console.log('head:', d)
    return d[0]
  } %}

body
  -> type {% d => {
    console.log('body:', d)
    return d[0]
  } %}

service 
  -> "service" _ identifier
    {% d => 
      ({
        type: "service",
        id: d[2]
      })
    %}

type
  -> "type" _ identifier
    {% d => 
      ({
        type: "type",
        name: d[2]
      })
    %}

identifier
  -> %identifier
    {% d => d[0].value %}

number -> %number {% (d) => parseFloat(d[0].value) %}

string -> %string {% (d) => JSON.parse(d[0].value) %}

_ -> null | %space {% () => null %}