# Double-quoted string
dqstring
  -> "\"" dstrchar:* "\""
    {% (data) => data[1].join("") %}

dstrchar
  -> [^\\"\n] {% id %}
  |  "\\" strescape 
    {% (data) => JSON.parse("\"" + data.join("" ) + "\"") %}

# Single-quoted string
sqstring
  -> "'" sstrchar:* "'"
    {% (data) => data[1].join("") %}

sstrchar
  -> [^\\'\n] {% id %}
  |  "\\" strescape
    {% (data) => JSON.parse("\"" + data.join("") + "\"") %}
  |  "\\'"
    {% () => "'" %}

strescape -> ["\\/bfnrt] {% id %}
    | "u" [a-fA-F0-9] [a-fA-F0-9] [a-fA-F0-9] [a-fA-F0-9] 
      {% (data) => data.join("") %}

# Back-tick string
btstring
  -> "`" [^`]:* "`"
    {% (data) => data[1].join("") %}