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
  // Output state
  let level = 0;
  const lines = [];

  append(lines, level, `mutation {`);
  append(lines, level, `  addLogicService(input: {`);
  append(lines, level, `    id: "${ast.service.id}"`);
  append(lines, level, `    name: "${ast.service.name}"`);
  append(lines, level, `    description: "${ast.service.description}"`);
  append(lines, level, `    addTypes: [`);
  for (const def of ast.definitions.filter(x => x["type"] !== undefined)) {
    append(lines, level, `      {`);
    append(lines, level, `        name: "${def.type.name}"`);
    append(lines, level, `        signature: {`);
    append(lines, level, `          signatureType: ${SignatureType.PRODUCT}`);
    append(lines, level, `          product: {`);
    append(lines, level, `            fields: [`);
    for (const field of def.type.fields) {
      append(lines, level, `              {`);
      append(lines, level, `                name: "${field.name}"`);
      append(lines, level, `                type: {`);
      emitType(field.type, lines);
      append(lines, level, `                }`);
      append(lines, level, `              }`);
    }
    append(lines, level, `            ]`); // fields
    append(lines, level, `          }`); // product
    append(lines, level, `        }`); // signature
    append(lines, level, `      }`); // field
  }
  append(lines, level, `    ]`); // types
  append(lines, level, `    addFunctions: [`);
  for (const def of ast.definitions.filter(x => x["function"] !== undefined)) {
    append(lines, level, `      {`);
    append(lines, level, `        name: "${def.function.name}"`);
    append(lines, level, `      }`); // type
  }
  append(lines, level, `    ]`); // functions
  append(lines, level, `  })`);
  append(lines, level, `  { id }`);
  append(lines, level, `}`);
  return lines.join("\n");
};

const emitType = (typeDef, lines) => {
  append(lines, level, `expressionType: ${OfTypeSignatureType.TYPE}`);
  append(lines, level, `detail: ${JSON.stringify(typeDef)}`);
};

const append = (lines, level, str) => lines.push(indent(level, str));

const indent = (level, str) => "  ".repeat(level) + str;

module.exports = {
  generate
};
