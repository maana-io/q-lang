#
# Maana Q Language Grammar
#
@include "identifier.ne"
@include "number.ne"
@include "string.ne"
@include "whitespace.ne"

# Root document
input
  -> _ preamble __ definitions _
    {% d => ({
        ...d[1],
        definitions: d[3]
    }) %}

# services can contain '.', which is also the function application symbol
apply
  -> service_identifier "." identifier


#
# Head portion of the document
#
preamble
  -> service __ imports:?
    {% d => ({ ...d[0], imports: d[2] }) %}

#
# Body portion of the document
#
definitions
  -> definition {% d => [d[0]] %}
  |  definition __ definitions {% d => [d[0], ...d[2]] %}

definition
  -> function {% id %}
  |  interface {% id %}
  |  type {% id %}

#
# Service declaration
#
service
  -> "service" __ service_identifier
    {% d => ({ service: d[2] }) %}

#
# Imports
#
imports
  -> import {% d => [d[0]] %}
  |  import __ imports {% d => [d[0], ...d[2]] %}

import
  -> "import" __ import_identifier import_as:? __ import_selector_block
    {% d => ({
        service: d[2],
        alias: d[3],
        import: d[5]
    }) %}

import_identifier 
  -> service_identifier {% id %}

import_as
  -> __ "as" __ identifier
    {% d => d[3] %}

import_selector_block
  -> "{" _ import_selectors _ "}"
    {% d => d[2] %}

import_selectors
  -> import_selector {% d => [d[0]] %}
  |  import_selector __ import_selectors {% d => [d[0], ...d[2]] %}

import_selector
  -> identifier {% id %}

#
# Interfaces
#
interface
  -> "interface" __ identifier
    {% d => ({
      interface: {
        name: d[2]
      }
    }) %}

#
# Types
#
type
  -> "type" __ identifier _ "{" _ type_fields _ "}"
    {% d => ({
      type: {
        name: d[2]
      }
    }) %}

type_fields
  -> type_field {% d => [d[0]] %}
  |  type_field __ type_fields {% d => [d[0], ...d[2]] %}

type_field
  -> identifier _ ":" _ identifier
    {% d => ({ field: { name: d[0], type_sig: d[4] }}) %}

#
# Functions
#
function
  -> "function" __ identifier
    {% d => ({
      function: {
        name: d[2]
      }
    }) %}

