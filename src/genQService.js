const fs = require("mz/fs")
const path = require("path")

/*
addLogicService(input: {
    name: "testsvc"
    addTypes: [
      {
        name: "myscalar"
        signature: {
          signatureType: SCALAR
          scalar: {
            id: "String"
          }
        }
      }
      {
        name: "myrecursiveproduct"
        signature:{
          signatureType: PRODUCT
          product: {
            fields: [
              {
                name: "recurse"
                type: {
                  expressionType: TYPE
                  type: {
                    locType: THIS_SVC
                    name: "myrecursiveproduct"
                  }
                }
              }
              {
                name: "scalar"
                type: {
                  expressionType: TYPE
                  type: {
                    locType: THIS_SVC
                    name: "myscalar"
                  }
                }
              }
            ]
          }
        }
      }
    ]
    addFunctions: [
      {
        name: "blah"
        implementation: FUNCTION_GRAPH
        graphqlFunctionType: QUERY
        signature: {
          arguments: []
          resultType: {
            expressionType: TYPE
            type: {
              locType: THIS_SVC
              name: "myrecursiveproduct"
              # can be "myscalar" as well
            }
          }
        }
        values: [
          {
            id: "orphan"
            value: {
              valueInputType: LONG
              long:{
                LONG: 42
              }
            }
          }
        ]
      }
    ]
  }) {
    id name
    location { url }
    ... on LogicService {
      types {
        id name description
        signature {
          __typename
          ... on Product {
            fields  {
              name
              type {
                __typename
                ... on Scalar {
                  id
                }
              }
            }
          }
        }
      }
      functions {
        __typename
        id name
        signature {
          arguments {
            name type { __typename }
          }
          resultType {
            __typename
            ... on Type {
              id name
            }
          }
        }
        ... on CKGFunction {
          implementation {
            ... on FunctionGraph {
              nodes {
                id
                ... on ValueNode {
                  value {
                    ...Val
                    ... on ListValue {
                      values {
                        ... Val
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

fragment Val on Value {
  ... on StringValue {
    STRING
  }
  ... on IDValue {
    ID
  }
  ... on LongValue {
    LONG
  }
  ... on BooleanValue {
    BOOL
  }
  ... on DoubleValue {
    DOUBLE
  }
  ... on ObjectValue {
    OBJECT
  }
  ... on FunctionValue {
    FN {
      id
    }
  }
}
*/

const generate = ast => {

  const service = {
    types: [],
    functions: []
  }

  for (let statement of ast) {
    console.log('st', statement)
    if (!statement) continue
    if (statement.type === 'service') {
      service.id = statement.id
    } else if (statement.type === 'type') {
      service.types.push({
        name: statement.name
      })
    }
    else {
      console.log('unhandled statement:', statement)
    }
  }
  console.log('s', service)
  const lines = []
  lines.push(`mutation {`)
  lines.push(`  addLogicService(input: {`)
  lines.push(`    id: \"${service.id}\"`)
  lines.push(`    addTypes: [`)
  for (let typ of service.types) {
    lines.push(`      name: \"${typ.name}\"`)
  }
  lines.push(`    ]`)
  lines.push(`  }`)
  lines.push(`}`)
  return lines.join("\n")
}

module.exports = {
  generate
}