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
    {% (data) => {
      console.log('input ->', data)
      return ({
        ...data[1],
        definitions: data[3]
      })
    } %}

# services can contain '.', which is also the function application symbol
apply
  -> service_identifier "." identifier


#
# Head portion of the document
#
preamble
  -> service __ imports:?
    {% (data) => {
      console.log("preamble ->", data)
      return ({ ...data[0], imports: data[2] })
     } %}

#
# Body portion of the document
#
definitions
  -> definition {% (data) => [data[0]] %}
  |  definition __ definitions {% (data) => [data[0], ...data[2]] %}

definition
  -> type {% id %}
  |  function {% id %}

#
# Service declaration
#
service
  -> "service" __ service_identifier
    {% (data) => ({ service: data[2] }) %}

#
# Imports
#
imports
  -> import {% (data) => [data[0]] %}
  |  import __ imports {% (data) => [data[0], ...data[2]] %}

import
  -> "import" __ import_identifier import_as:? __ import_selector_block
    {% (data) => {
      console.log('imp2 ->', data);
      return ({
        service: data[2],
        alias: data[3],
        import: data[5]
      })
    }%}

import_identifier 
  -> service_identifier {% id %}

import_as
  -> __ "as" __ identifier
    {% (data) => data[3] %}

import_selector_block
  -> "{" _ import_selectors _ "}"
    {% (data) => data[2] %}

import_selectors
  -> import_selector {% (data) => [data[0]] %}
  |  import_selector __ import_selectors {% (data) => [data[0], ...data[2]] %}

import_selector
  -> identifier {% id %}

#
# Types
#
type
  -> "type" __ identifier
    {% (data) => ({
      type: {
        name: data[2]
      }
    }) %}

#
# Functions
#
function
  -> "function" __ identifier
    {% (data) => ({
      function: {
        name: data[2]
      }
    }) %}

