#
# Zed Language Grammar
#

# Lexer
# @{%

# const moo = require('moo')

# let lexer = moo.compile({
#     id: /[a-zA-Z0-9]+/,
#     space: {match: /\s+/, lineBreaks: true},
#     number: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,
#     string: /"(?:\\["bfnrt\/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/,
#     '{': '{',
#     '}': '}',
#     '[': '[',
#     ']': ']',
#     '<': '<',
#     '>': '>',
#     '(': '(',
#     ')': ')',
#     ',': ',',
#     ':': ':',
#     '=': '=',
#     '=>': '=>',
#     true: 'true',
#     false: 'false',
#     null: 'null',
#     type: 'type'
# })

# %}

# @lexer lexer

######################

@include "identifier.ne"
@include "number.ne"
@include "string.ne"
@include "whitespace.ne"

##############################

zed
  -> schemas _ {% d => d[0] %}

schemas
  -> schema {% d => [d[0]] %}
  |  schema __ schemas {% d => [d[0], ...d[2]] %}

schema
  -> _ "schema" __ identifier _ declarations_block _ predicates_block:?
    {% d => ({ schema: { name: d[3], declarations: d[5], predicates: d[7] } }) %}

declarations_block
  -> "{" _ declarations:? _ "}" {% d => d[2] %}

predicates_block
  -> "where" _ "{" _ predicates:? _ "}" {% d => d[4] %}

declarations
  -> declaration {% d => [d[0]] %}
  |  declaration __ declarations {% d => [d[0], ...d[2]] %}
  
declaration
  -> identifier _ ":" _ identifier {% d => ({ declaration: { [d[0]] : d[4] }}) %}

predicates
  -> predicate {% d => [d[0]] %}
  |  predicate __ predicates {% d => [d[0], ...d[2]] %}

predicate
  -> not {% id %}
  |  and {% id %}
  |  or {% id %}
  |  iff {% id %}
  |  implies {% id %}
  |  "(" _ predicate _ ")" {% d => d[2] %}
  |  "true" {% () => ({ true: true }) %}
  |  "false" {% () => ({ false: false }) %}
 
not
  -> "!" _ predicate {% d => ({ not: { p: d[2] } }) %}

and
  -> predicate _ "/\\" _ predicate 
    {% d => ({ and: { p: d[0], q: d[4] } }) %}

or
  -> predicate _ "\\/" _ predicate 
    {% d => ({ or: { p: d[0], q: d[4] } }) %}

iff
  -> predicate _ "iff" __ predicate 
    {% d => ({ iff: { p: d[0], q: d[4] } }) %}

implies
  -> predicate _ "=>" _ predicate 
    {% d => ({ implies: { p: d[0], q: d[4] } }) %}