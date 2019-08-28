// Generated automatically by nearley, version 2.18.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "identifier$ebnf$1", "symbols": []},
    {"name": "identifier$ebnf$1", "symbols": ["identifier$ebnf$1", "identifier_nth_char"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "identifier", "symbols": ["identifier_1st_char", "identifier$ebnf$1"], "postprocess": (data) => data[0] + data[1].join("")},
    {"name": "identifier_1st_char", "symbols": [/[a-zA-Z_\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]/], "postprocess": id},
    {"name": "identifier_nth_char", "symbols": [/[a-zA-Z_0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]/], "postprocess": id},
    {"name": "service_identifier$ebnf$1", "symbols": []},
    {"name": "service_identifier$ebnf$1", "symbols": ["service_identifier$ebnf$1", "service_identifier_nth_char"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "service_identifier", "symbols": ["service_identifier_1st_char", "service_identifier$ebnf$1"], "postprocess": (data) => data[0] + data[1].join("")},
    {"name": "service_identifier_1st_char", "symbols": [/[a-zA-Z_0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]/], "postprocess": id},
    {"name": "service_identifier_nth_char", "symbols": [/[a-zA-Z_\-.0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]/], "postprocess": id},
    {"name": "unsigned_int$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_int$ebnf$1", "symbols": ["unsigned_int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_int", "symbols": ["unsigned_int$ebnf$1"], "postprocess": (data) => parseInt(d[0].join(""))},
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "int$ebnf$1", "symbols": ["int$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "int$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "int$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "int$ebnf$2", "symbols": ["int$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "int", "symbols": ["int$ebnf$1", "int$ebnf$2"], "postprocess":  (data) => {
            if (d[0]) {
                return parseInt(d[0][0]+d[1].join(""));
            } else {
                return parseInt(d[1].join(""));
            }
        } },
    {"name": "unsigned_decimal$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$1", "symbols": ["unsigned_decimal$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1", "symbols": [{"literal":"."}, "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1"]},
    {"name": "unsigned_decimal$ebnf$2", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "unsigned_decimal$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "unsigned_decimal", "symbols": ["unsigned_decimal$ebnf$1", "unsigned_decimal$ebnf$2"], "postprocess": (data) => parseFloat(d[0].join("") + (d[1] ? "."+d[1][1].join("") : ""))},
    {"name": "decimal$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "decimal$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$2", "symbols": ["decimal$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": ["decimal$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "decimal$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "decimal$ebnf$3", "symbols": ["decimal$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "decimal$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal", "symbols": ["decimal$ebnf$1", "decimal$ebnf$2", "decimal$ebnf$3"], "postprocess": (data) => parseFloat((d[0] || "") + d[1].join("") + (d[2] ? "."+d[2][1].join("") : ""))},
    {"name": "percentage", "symbols": ["decimal", {"literal":"%"}], "postprocess": (data) => d[0]/100},
    {"name": "jsonfloat$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "jsonfloat$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$2", "symbols": ["jsonfloat$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": ["jsonfloat$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "jsonfloat$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "jsonfloat$ebnf$3", "symbols": ["jsonfloat$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [/[+-]/], "postprocess": id},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": ["jsonfloat$ebnf$4$subexpression$1$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$4$subexpression$1", "symbols": [/[eE]/, "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "jsonfloat$ebnf$4$subexpression$1$ebnf$2"]},
    {"name": "jsonfloat$ebnf$4", "symbols": ["jsonfloat$ebnf$4$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat", "symbols": ["jsonfloat$ebnf$1", "jsonfloat$ebnf$2", "jsonfloat$ebnf$3", "jsonfloat$ebnf$4"], "postprocess":  (data) => parseFloat(
        (d[0] || "") + d[1].join("") +
        (d[2] ? "." + d[2][1].join("") : "") +
        (d[3] ? "e" + (d[3][1] || "+") + d[3][2].join("") : ""))
            },
    {"name": "dqstring$ebnf$1", "symbols": []},
    {"name": "dqstring$ebnf$1", "symbols": ["dqstring$ebnf$1", "dstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "dqstring", "symbols": [{"literal":"\""}, "dqstring$ebnf$1", {"literal":"\""}], "postprocess": (data) => data[1].join("")},
    {"name": "dstrchar", "symbols": [/[^\\"\n]/], "postprocess": id},
    {"name": "dstrchar", "symbols": [{"literal":"\\"}, "strescape"], "postprocess": (data) => JSON.parse("\"" + data.join("" ) + "\"")},
    {"name": "sqstring$ebnf$1", "symbols": []},
    {"name": "sqstring$ebnf$1", "symbols": ["sqstring$ebnf$1", "sstrchar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "sqstring", "symbols": [{"literal":"'"}, "sqstring$ebnf$1", {"literal":"'"}], "postprocess": (data) => data[1].join("")},
    {"name": "sstrchar", "symbols": [/[^\\'\n]/], "postprocess": id},
    {"name": "sstrchar", "symbols": [{"literal":"\\"}, "strescape"], "postprocess": (data) => JSON.parse("\"" + data.join("") + "\"")},
    {"name": "sstrchar$string$1", "symbols": [{"literal":"\\"}, {"literal":"'"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "sstrchar", "symbols": ["sstrchar$string$1"], "postprocess": () => "'"},
    {"name": "strescape", "symbols": [/["\\\/bfnrt]/], "postprocess": id},
    {"name": "strescape", "symbols": [{"literal":"u"}, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/, /[a-fA-F0-9]/], "postprocess": (data) => data.join("")},
    {"name": "btstring$ebnf$1", "symbols": []},
    {"name": "btstring$ebnf$1", "symbols": ["btstring$ebnf$1", /[^`]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "btstring", "symbols": [{"literal":"`"}, "btstring$ebnf$1", {"literal":"`"}], "postprocess": (data) => data[1].join("")},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": () => null},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": () => null},
    {"name": "wschar", "symbols": [/[ \t\r\n\v\f]/], "postprocess": id},
    {"name": "input", "symbols": ["_", "preamble", "__", "definitions", "_"], "postprocess":  d => ({
            ...d[1],
            definitions: d[3]
        }) },
    {"name": "apply", "symbols": ["service_identifier", {"literal":"."}, "identifier"]},
    {"name": "preamble$ebnf$1", "symbols": ["imports"], "postprocess": id},
    {"name": "preamble$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "preamble", "symbols": ["service", "__", "preamble$ebnf$1"], "postprocess": d => ({ ...d[0], imports: d[2] })},
    {"name": "definitions", "symbols": ["definition"], "postprocess": d => [d[0]]},
    {"name": "definitions", "symbols": ["definition", "__", "definitions"], "postprocess": d => [d[0], ...d[2]]},
    {"name": "definition", "symbols": ["function"], "postprocess": id},
    {"name": "definition", "symbols": ["interface"], "postprocess": id},
    {"name": "definition", "symbols": ["type"], "postprocess": id},
    {"name": "service$string$1", "symbols": [{"literal":"s"}, {"literal":"e"}, {"literal":"r"}, {"literal":"v"}, {"literal":"i"}, {"literal":"c"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "service", "symbols": ["service$string$1", "__", "service_identifier"], "postprocess": d => ({ service: d[2] })},
    {"name": "imports", "symbols": ["import"], "postprocess": d => [d[0]]},
    {"name": "imports", "symbols": ["import", "__", "imports"], "postprocess": d => [d[0], ...d[2]]},
    {"name": "import$string$1", "symbols": [{"literal":"i"}, {"literal":"m"}, {"literal":"p"}, {"literal":"o"}, {"literal":"r"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "import$ebnf$1", "symbols": ["import_as"], "postprocess": id},
    {"name": "import$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "import", "symbols": ["import$string$1", "__", "import_identifier", "import$ebnf$1", "__", "import_selector_block"], "postprocess":  d => ({
            service: d[2],
            alias: d[3],
            import: d[5]
        }) },
    {"name": "import_identifier", "symbols": ["service_identifier"], "postprocess": id},
    {"name": "import_as$string$1", "symbols": [{"literal":"a"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "import_as", "symbols": ["__", "import_as$string$1", "__", "identifier"], "postprocess": d => d[3]},
    {"name": "import_selector_block", "symbols": [{"literal":"{"}, "_", "import_selectors", "_", {"literal":"}"}], "postprocess": d => d[2]},
    {"name": "import_selectors", "symbols": ["import_selector"], "postprocess": d => [d[0]]},
    {"name": "import_selectors", "symbols": ["import_selector", "__", "import_selectors"], "postprocess": d => [d[0], ...d[2]]},
    {"name": "import_selector", "symbols": ["identifier"], "postprocess": id},
    {"name": "interface$string$1", "symbols": [{"literal":"i"}, {"literal":"n"}, {"literal":"t"}, {"literal":"e"}, {"literal":"r"}, {"literal":"f"}, {"literal":"a"}, {"literal":"c"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "interface", "symbols": ["interface$string$1", "__", "identifier"], "postprocess":  d => ({
          interface: {
            name: d[2]
          }
        }) },
    {"name": "type$string$1", "symbols": [{"literal":"t"}, {"literal":"y"}, {"literal":"p"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "type", "symbols": ["type$string$1", "__", "identifier", "_", {"literal":"{"}, "_", "type_fields", "_", {"literal":"}"}], "postprocess":  d => ({
          type: {
            name: d[2]
          }
        }) },
    {"name": "type_fields", "symbols": ["type_field"], "postprocess": d => [d[0]]},
    {"name": "type_fields", "symbols": ["type_field", "__", "type_fields"], "postprocess": d => [d[0], ...d[2]]},
    {"name": "type_field", "symbols": ["identifier", "_", {"literal":":"}, "_", "identifier"], "postprocess": d => ({ field: { name: d[0], type_sig: d[4] }})},
    {"name": "function$string$1", "symbols": [{"literal":"f"}, {"literal":"u"}, {"literal":"n"}, {"literal":"c"}, {"literal":"t"}, {"literal":"i"}, {"literal":"o"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "function", "symbols": ["function$string$1", "__", "identifier"], "postprocess":  d => ({
          function: {
            name: d[2]
          }
        }) }
]
  , ParserStart: "input"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
