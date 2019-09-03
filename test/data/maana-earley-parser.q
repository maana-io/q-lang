# based on:
# - https://joshuagrams.github.io/pep/

@service(
  id: "maana-earley-parser",
  name: "Maana Q Earley Parser",
  description: "A Maana Q implementation of the Earley parsing algorithm"
)

type Symbol: String

type Rule {
  symbol: Symbol!
  production: [Symbol!]!
}

type Grammar {
  start: Symbol!
  rules: [Rule!]!
}

function rulesForSymbol(
  grammar: Grammar!,
  symbol: Symbol!
): [Rule!]! {
  ruleFilter(
    filters: [{
      fieldName: "grammar",
      op: "EQUAL",
      value: grammar
    }, {
      fieldName: "symbol",
      op: "EQUAL",
      value: symbol
    }]
  )
}

type LR0 {
  rule: Rule!
  dot: Int!
}

function next_symbol(
  lr0: LR0
): Symbol @function(language: "javascript") {
    if (lr0.dot < lr0.rule.production.length)
      lr0.rule.production[lr0.dot]
}

function advance(
  lr0: LR0!
): Symbol or LR0 @function(language: "javascript") {
  if (lr0.dot === lr0.rule.production.length)
    lr0.rule.symbol
  else 
    new LR0(lr0.rule, lr0.dot+1)
}