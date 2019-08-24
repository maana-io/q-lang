#
# Maana Q Language Grammar
#

@builtin "number.ne"
@builtin "string.ne"
@builtin "whitespace.ne"

input -> __ preamble __
  # -> preamble definition:*
    {% (data) => { 
      //console.log("data", JSON.stringify(data))
      const res = ({ ...data[0], ...data[1] })
      //console.log("\n\nres", res)
      return res
    }%}

preamble
  -> service _ imports
    {% (data) => ({ ...data[0], imports: data[2] }) %}

imports
  -> import {% id %}
  |  import _ imports
    {% (data) => ([ data[0], data[2] ]) %}

definition
  -> type {% id %}
  |  function {% id %}

service
  -> "service" __ name
    {% (data) => ({ service: data[2] }) %}

import
  -> "import" __ name
    {% (data) => ({ import: data[2] }) %}

type
  -> "type"

function
  -> "function"

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

#   -> _ head _ body _ {% d => {
#     console.log('input:', d)
#     return d
#   }  %}

# head
#   -> service {% d => {
#     console.log('head:', d)
#     return d[0]
#   } %}

# body
#   -> type {% d => {
#     console.log('body:', d)
#     return d[0]
#   } %}

# service 
#   -> "service" _ identifier
#     {% d => 
#       ({
#         type: "service",
#         id: d[2]
#       })
#     %}

# type
#   -> "type" _ identifier
#     {% d => 
#       ({
#         type: "type",
#         name: d[2]
#       })
#     %}

# identifier
#   -> %identifier
#     {% d => d[0].value %}

# number -> %number {% (d) => parseFloat(d[0].value) %}

# string -> %string {% (d) => JSON.parse(d[0].value) %}

# _ -> null | %space {% () => null %}