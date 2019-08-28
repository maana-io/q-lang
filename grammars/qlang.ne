#
# Maana Q Language Grammar
#
@include "identifier.ne"
@include "number.ne"
@include "string.ne"
@include "whitespace.ne"

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
  -> function_definition   {% id %}
  |  interface_definition  {% id %}
  |  type_definition       {% id %}

#
# Service declaration
#
service
  -> "service" __ service_identifier {% d => ({ service: d[2] }) %}

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
  -> "interface" __ identifier _ field_block
    {% d => ({ interface: { name: d[2], fields: d[4] }}) %}

#
# Types
#
type_definition
  -> "type" __ identifier _ implements_interface:? _ field_block
    {% d => ({ type: { name: d[2], implements: d[4], fields: d[6] }}) %}

# GraphQL-style type (e.g., [Person!]!)
type
  -> identifier       {% d => ({ id: d[0] }) %}       # standalone type
  |  type "!"         {% d => ({ required: d[0] }) %} # non-null wrapper
  |  "[" _ type _ "]" {% d => ({ arrayOf: d[2] }) %}  # collection wrapper

implements_interface
  -> "implements" __ interface_ref              {% d => [d[2]] %}
  |  implements_interface _ "&" _ interface_ref {% d => [...d[0], d[4]] %}

interface_ref
  -> identifier {% id %}

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
function_apply
  -> service_identifier "." identifier

#
# Fields
#
field_block
  -> "{" _ field_definitions _ "}" {% d => d[2] %}

field_definitions
  -> field_definition                       {% d => [d[0]] %}
  |  field_definition __ field_definitions  {% d => [d[0], ...d[2]] %}

field_definition
  -> identifier _ argument_block:? _ ":" _ type
    {% d => ({ name: d[0], args: d[2], type: d[6] }) %}

#
# Arguments
#
argument_block
  -> "(" _ arguments:? _ ")" {% d => d[2] %}

arguments
  -> argument               {% d => [d[0]] %}
  |  argument __ arguments  {% d => [d[0], ...d[2]] %}

argument
  -> identifier _ ":" _ type {% d => ({ name: d[0], type: d[4] }) %}