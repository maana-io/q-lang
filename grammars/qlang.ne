#
# Maana Q Language Grammar
#

##############################

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

##################

# s -> %lit:+ {% id %}

###################

# start -> type_def:* _ {% d => d[0] %}

# type_def
#   -> _ "type" _ con_type {% d => d[3] %}

# con_type
#   -> identifier con_block:? field_block {% d => ({ id: d[0], type_parameters: d[1], fields: d[2] }) %}

# con_block
#   -> _ "<" cons:+ _ ">" {% d => d[2] %}

# cons
#   -> _ identifier                     {% d => ({ type: d[1] })  %}
#   |  _ identifier _ "=" _ identifier {% d => ({ type: d[1], extends: d[5] }) %}

# field_block
#   -> _ "{" field:* _ "}" {% d => d[2] %}

# field
#   -> _ identifier _ ":" _ identifier {% d => ({ name: d[1], type: d[5] }) %}

# identifier
#   -> %id {% d => d[0].value %}

# _ -> null | %space {% () => null %}

##############

# Root document
input
  -> _ preamble __ definitions _ {% d => ({ ...d[1], definitions: d[3] }) %}

#
# Head portion of the document
#
preamble
  -> service __ imports:? {% d => ({ ...d[0], imports: d[2] }) %}

#
# Body portion of the document
#
definitions
  -> definition                 {% d => [d[0]] %}
  |  definition __ definitions  {% d => [d[0], ...d[2]] %}

definition
  -> function_definition    {% id %}
  |  interface_definition   {% id %}
  |  type_definition        {% id %}
  |  comment_block          {% id %}

#
# Service declaration
# - every compilation unit must have a service or extends service declaration
service
  -> "service" __ service_identifier _ service_directive:? 
    {% d => ({
      service: { 
        id: d[2],
        name: d[2],
        description: d[2],
        ...d[5] // override with directives
        }
    }) %}

service_directive
  -> "@service" _ "(" _ service_directive_args:? _ ")"
    {% d => {
      const obj = {}
      d[4].forEach(x => obj[Object.keys(x)[0]] = Object.values(x)[0] )
      return obj
    } %}

service_directive_args
  -> service_directive_arg                                {% d => [d[0]] %}
  |  service_directive_arg _ "," _ service_directive_args {% d => [d[0], ...d[4]] %}

service_directive_arg
  -> "name" _ ":" _ dqstring        {% d => ({ name: d[4] }) %}
  |  "description" _ ":" _ dqstring {% d => ({ description: d[4] }) %}

#
# Imports
#
imports
  -> import             {% d => [d[0]] %}
  |  import __ imports  {% d => [d[0], ...d[2]] %}

import
  -> "import" __ import_identifier import_as:? __ import_selector_block
    {% d => ({ service: d[2], alias: d[3], import: d[5] }) %}

import_identifier 
  -> service_identifier {% id %}

import_as
  -> __ "as" __ identifier {% d => d[3] %}

import_selector_block
  -> "{" _ import_selectors _ "}" {% d => d[2] %}

import_selectors
  -> import_selector                      {% d => [d[0]] %}
  |  import_selector __ import_selectors  {% d => [d[0], ...d[2]] %}

import_selector
  -> identifier {% id %}

#
# Interfaces
#
interface_definition
  -> "interface" __ constrained_type _ field_block
    {% d => ({ interface: { name: d[2], fields: d[4] }}) %}

#
# Types
#
type_definition
  -> "type" __ constrained_type _ type_implements:? _ field_block _
    {% d => ({ type: { name: d[2], implements: d[4], fields: d[6] }}) %}

# A constrained type is a type with a type parameter that may be constrained by
# deriving (extending) from a supertype
constrained_type
  -> identifier _ type_constraint_block:? {% d => ({ type: d[0], constraints: d[2] }) %}

type_constraint_block
  -> "<" _ type_constraints _ ">" {% d => d[2] %}

type_constraints
  -> type_constraint                          {% d => [d[0]] %}
  |  type_constraint _ "," _ type_constraints {% d => [d[0], ...d[4]] %}

type_constraint
  -> identifier _ type_extends:? {% d => ({ name: d[0], type_extends: d[2] }) %}

type_extends
  -> "=>" _ parameterized_type {% d => d[2] %}

type_implements
  -> "implements" __ parameterized_type (_ "&" _ parameterized_type):*
    {% d => { console.log('impl', d); return [d[2], ...d[3].map(x => x[3])] } %}

# Parameterized types appear on the right side of field definitions, arguments,
# and 'implements' expressions
parameterized_type
  -> identifier _ type_parameter_block:? {% d => ({ type: d[0], parameters: d[2] }) %}

type_parameter_block
  -> "<" _ type_parameters _ ">" {% d => d[2] %}

type_parameters
  -> identifier                    {% d => [d[0]] %}
  |  identifier _ "," _ identifier {% d => [d[0], ...d[4]] %}

# GraphQL-style type (e.g., [Person!]!)
type
  -> parameterized_type {% id %}                        # standalone type
  |  type "!"           {% d => ({ required: d[0] }) %} # non-null wrapper
  |  "[" _ type _ "]"   {% d => ({ list: d[2] }) %}     # list wrapper

#
# Functions
#
function_definition
  -> "function" __ identifier _ argument_block _ ":" _ type _ function_implementation_block
    {% d => ({ function: { name: d[2], args: d[4], type: d[8], impl: d[10] }}) %}

function_implementation_block
  -> "{" _ function_implementation:? _ "}" {% d => d[2] %}

function_implementation
  -> "hi" {% id %}
  
# services can contain '.', which is also the function application symbol
function_application
  -> service_identifier "." identifier

#
# Fields
#
field_block
  -> "{" _ field_definitions:? _ "}" {% d => d[2] %}

field_definitions
  -> field_definition                       {% d => [d[0]] %}
  |  field_definition __ field_definitions  {% d => [d[0], ...d[2]] %}

field_definition
  -> identifier _ argument_block:? _ ":" _ type _ function_implementation_block:?
    {% d => ({ name: d[0], args: d[2], type: d[6], impl: d[8] }) %}

#
# Arguments
#
argument_block
  -> "(" _ arguments:? _ ")" {% d => d[2] %}

arguments
  -> argument                   {% d => [d[0]] %}
  |  argument _ "," _ arguments {% d => [d[0], ...d[2]] %}

argument
  -> identifier _ ":" _ type {% d => ({ name: d[0], type: d[4] }) %}

#
# Directives
#
directive
  -> "@" identifier _ "(" _ key_values:? _ ")" {% d => ({ directive: { [d[1]]: d[5] } }) %}

key_values
  -> key_value {% d => [d[0]] %}
  |  key_value _ key_values {% d => [d[0], ...d[2]] %}

key_value
  -> identifier _ ":" _ value {% d => ({ [d[0]]: d[4] }) %}

value
  -> dqstring   {% id %}
  |  sqstring   {% id %}
  |  int        {% id %}
  |  jsonfloat  {% id %}

#
# Comments
#
comment_block
  -> comments {% d => d[0].join("\n") %}

comments
  -> comment {% d => [d[0]] %}
  |  comment _ comments {% d => [d[0], ...d[2]] %}

comment
  -> "#" [^\r\n]:* _ {% d => d[1].join("") %}

#########################

# json -> _ (object | array) _ {% function(d) { return d[1][0]; } %}

# object -> "{" _ "}" {% function(d) { return {}; } %}
#     | "{" _ pair (_ pair):* _ "}" {% extractObject %}

# array -> "[" _ "]" {% function(d) { return []; } %}
#     | "[" _ value (_ "," _ value):* _ "]" {% extractArray %}

# value ->
#       object {% id %}
#     | array {% id %}
#     | number {% id %}
#     | name {% id %}
#     | string {% id %}
#     | "true" {% function(d) { return true; } %}
#     | "false" {% function(d) { return false; } %}
#     | "null" {% function(d) { return null; } %}

# number -> %number {% function(d) { return parseFloat(d[0].value) } %}

# string -> %string {% function(d) { return JSON.parse(d[0].value) } %}

# name -> %id {% d=> d[0].value %}

# pair -> key _ ":" _ value {% function(d) { return [d[0], d[4]]; } %}

# key -> name {% id %}

# _ -> null | %space {% function(d) { return null; } %}

# @{%

# function extractPair(kv, output) {
#     if(kv[0]) { output[kv[0]] = kv[1]; }
# }

# function extractObject(d) {
#     let output = {};

#     extractPair(d[2], output);

#     for (let i in d[3]) {
#         extractPair(d[3][i][1], output);
#     }

#     return output;
# }

# function extractArray(d) {
#     let output = [d[2]];

#     for (let i in d[3]) {
#         output.push(d[3][i][3]);
#     }

#     return output;
# }

# %}

