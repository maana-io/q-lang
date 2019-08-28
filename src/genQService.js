const fs = require("mz/fs");
const path = require("path");

const SignatureType = {
  SCALAR: "SCALAR",
  SUM: "SUM",
  PRODUCT: "PRODUCT"
};

const OfTypeSignatureType = {
  TYPE: "TYPE",
  LIST: "LIST",
  NONULL: "NONULL",
  TYPE_PARAMETER: "TYPE_PARAMETER",
  SCALAR: "SCALAR",
  SUM: "SUM",
  PRODUCT: "PRODUCT",
  FUNCTION: "FUNCTION"
};

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
  const lines = [];
  lines.push(`mutation {`);
  lines.push(`  addLogicService(input: {`);
  lines.push(`    id: "${ast.service.id}"`);
  lines.push(`    name: "${ast.service.name}"`);
  lines.push(`    description: "${ast.service.description}"`);
  lines.push(`    addTypes: [`);
  for (const def of ast.definitions.filter(x => x["type"] !== undefined)) {
    lines.push(`      {`);
    lines.push(`        name: "${def.type.name}"`);
    lines.push(`        signature: {`);
    lines.push(`          signatureType: ${SignatureType.PRODUCT}`);
    lines.push(`          product: {`);
    lines.push(`            fields: [`);
    for (const field of def.type.fields) {
      lines.push(`              {`);
      lines.push(`                name: "${field.name}"`);
      lines.push(`                type: {`);
      emitType(field.type, lines);
      lines.push(`                }`);
      lines.push(`              }`);
    }
    lines.push(`            ]`); // fields
    lines.push(`          }`); // product
    lines.push(`        }`); // signature
    lines.push(`      }`); // field
  }
  lines.push(`    ]`); // types
  lines.push(`    addFunctions: [`);
  for (const def of ast.definitions.filter(x => x["function"] !== undefined)) {
    lines.push(`      {`);
    lines.push(`        name: "${def.function.name}"`);
    lines.push(`      }`); // type
  }
  lines.push(`    ]`); // functions
  lines.push(`  })`);
  lines.push(`  { id }`);
  lines.push(`}`);
  return lines.join("\n");
};

const emitType = (typeDef, lines) => {
  lines.push(`expressionType: ${OfTypeSignatureType.TYPE}`);
  lines.push(`detail: ${JSON.stringify(typeDef)}`);
};

module.exports = {
  generate
};
