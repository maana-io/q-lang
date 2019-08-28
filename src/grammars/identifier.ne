# A 'identifier' is like a string without the quotes, although some rules apply:
# - can't begin with a number
# - can't contain escape sequences
# - can contain extended characters (e.g., lambda, umlauts) + '_'
identifier 
  -> identifier_1st_char identifier_nth_char:*
    {% (data) => data[0] + data[1].join("") %}
identifier_1st_char
  -> [a-zA-Z_\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]
    {% id %}
identifier_nth_char
  -> [a-zA-Z_0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]
    {% id %}

# A 'service identifier' is like an 'identifier' (see above) except for:
# - can include '.' and '-' characters (but not as the first character)
# - can start with a number
service_identifier 
  -> service_identifier_1st_char service_identifier_nth_char:*
    {% (data) => data[0] + data[1].join("") %}
service_identifier_1st_char
  -> [a-zA-Z_0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]
    {% id %}
service_identifier_nth_char
  -> [a-zA-Z_\-.0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]
    {% id %}
