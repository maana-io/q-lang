# Whitespace: `_` is optional, `__` is mandatory.
_  -> wschar:* {% () => null %}
__ -> wschar:+ {% () => null %}
wschar -> [ \t\r\n\v\f] {% id %}