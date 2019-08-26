#
# Maana Q Language Grammar
#

@builtin "number.ne"
@builtin "string.ne"
@builtin "whitespace.ne"

#
# Root document
#
input -> foos:+ {% (data) => {
  console.log('inp -> ', data)
  return data[0] 
  } %}
# input -> import_selector_block

foos
  -> [a-z]:+ _ {% id %}
  # -> name {% id %}
  # |  name __ foos
  #   {% (data) => {
  #     console.log('foos->', data)
  #     return Array.isArray(data[2]) ? 
  #       [data[0], ...data[2]] :
  #       [data[0], data[2]]
  #   } %}
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
  -> "service" __ service_name
    {% (data) => ({ service: data[2] }) %}

#
# Imports
#
import
  -> "import" __ import_name import_as:? _ import_selector_block __
    {% (data) => {
      console.log('import -> ', data)
      const res = ({ service: data[2], as: data[3], selectors: data[5] })
      return res
     } %}

import_name 
  -> service_name {% id %}

import_as
  -> __ "as" __ name
    {% (data) => data[3] %}

import_selector_block
  -> "{" _ import_selector:+ "}"
    {% (data) => {
      console.log('isb -> ', data)
      return data[1] 
    } %}

import_selector 
  -> name:+ _ 
    {% (data) => {
      console.log('is -> ', data)
      return data[0].join("")
    } %}

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

#
# Lexer rules
#

# A 'name' is like a string without the quotes, although some rules apply:
# - a name can't begin with a number
# - a name can't contain escape sequences
# - 'alpha' is defined as the extended character set + '_'
name 
  -> alpha alpha_num:*
    {% (data) => data[0] + data[1].join("") %}
alpha -> [a-zA-Z_\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF] {% id %}
alpha_num -> [a-zA-Z_0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF] {% id %}

# A 'service name' is like a 'name' (see above) except for:
# - can include '.' and '-' characters (but not as the first character)
service_name 
  -> alpha service_alpha_num:*
    {% (data) => data[0] + data[1].join("") %}
service_alpha_num -> [a-zA-Z_\-.0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF] {% id %}
