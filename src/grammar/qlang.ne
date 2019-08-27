#
# Maana Q Language Grammar
#
@include "identifier.ne"
@include "number.ne"
@include "string.ne"
@include "whitespace.ne"

# Root document
input -> imports {% (data) => {
  console.log('input ->', data)
  //return data[0]
  return ({ imports: data[0] })
  } %}

# services can contain '.', which is also the function application symbol
apply
  -> service_identifier "." identifier

# input -> import_selector_block
items
  -> import_selector_block
    {% (data) => [data[0]] %}
  |  import_selector_block __ items
    {% (data) => [data[0], ...data[2]] %}

  # -> __ preamble __
  # -> preamble definition:*
    # {% (data) => { 
      # console.log("input ->", JSON.stringify(data))
      # const res = ({ ...data[0], ...data[1]] })
      # //console.log("\n\nres", res)
      # return res
    # }%}

#
# Head portion of the document
#
preamble
  -> service _ import:*
    {% (data) => {
      console.log("preamble ->", data)
      const res = ({ ...data[0], imports: data[2] })
      return res
     } %}

#
# Body portion of the document
#
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
        as: data[3],
        selectors: data[5]
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
  -> "type"

#
# Functions
#
function
  -> "function"

