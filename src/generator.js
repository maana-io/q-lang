// -----------------------------------------------------------------------------
// Imports
// -----------------------------------------------------------------------------
require("node-json-color-stringify");

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

// ------------------------------------
// AST
// ------------------------------------

const TypeRefTypes = {
  Scalar: "Scalar",
  Interface: "Interface",
  Type: "Type",
  Union: "Union",
  Enum: "Enum"
};

const GraphQLTypeTypes = {
  GraphQLTypeRef: "GraphQLTypeRef",
  GraphQLList: "GraphQLList",
  GraphQLNoNull: "GraphQLNoNull"
};

// ------------------------------------
// Catalog Service
// ------------------------------------

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

const SignatureType = {
  SCALAR: "SCALAR",
  SUM: "SUM",
  PRODUCT: "PRODUCT"
};

const LocType = {
  ID: "ID",
  NAME_AND_SVC: "NAME_AND_SVC",
  THIS_SVC: "THIS_SVC"
};

const IntrinsicTypes = {
  Boolean: "Boolean",
  Date: "Date",
  DateTime: "DateTime",
  Double: "Double",
  Float: "Float",
  ID: "ID",
  Int: "Int",
  JSON: "JSON",
  Long: "Long",
  String: "String",
  Time: "Time"
};

// -----------------------------------------------------------------------------
// Exported functions
// -----------------------------------------------------------------------------

// Given an AST, generate the GraphQL query (mutation) needed to add a new logic service
const generateAddLogicServiceMutationFromAST = ast => {
  // Generate the JSON input object
  const inputObject = generateAddLogicServiceInputObjectFromAST(ast);

  // Generate the GraphQL mutation from the input object
  const mutation = generateAddLogicServiceMutationFromInputObject(inputObject);

  return mutation;
};

// Build the input object for the addLogicService mutation
const generateAddLogicServiceInputObjectFromAST = ast => {
  // console.log(`ast:\n${JSON.colorStringify(ast, null, 2)}`);

  // Each service must have a directive that describes it
  const serviceDirective = ast.service;
  if (!serviceDirective) throw `FATAL: missing service directive`;

  const service = paramsToObject(serviceDirective.parameters);
  // console.log(`service:\n${JSON.colorStringify(service)}`);

  // Add empty placeholders for types and functions
  service.addTypes = [];
  service.addFunctions = [];

  // The AST is a collection of parsed nodes of specific type.
  // Build an index by type to simplify retrieval.
  const index = indexASTElements(ast.elements);

  // We'll pass these structures around as state
  const state = { service, index };

  // Generate type ref input objects for this service (i.e, LocType.THIS_SVC)
  generateTypeRefs(state);

  // console.log(`state (pre):\n${JSON.colorStringify(state, null, 2)}`);

  const ProcessingSteps = [
    processIncludes, // must be first
    processImports, // must preceed references to imports
    processScalars,
    processEnums,
    processInterfaces,
    processTypes,
    processUnions,
    processFunctions
  ];

  ProcessingSteps.forEach(step => step(state));

  return state.service;
};

const generateAddLogicServiceMutationFromInputObject = inputObject => {
  console.log(
    `generateAddLogicServiceMutationFromInputObject:\n${JSON.colorStringify(
      inputObject,
      null,
      2
    )}`
  );

  const lines = [];
  let level = 0;

  append(lines, level, `mutation {`);
  level++;
  append(lines, level, `addLogicService(input: {`);
  level++;
  // Object.keys(serviceDefinition.service).forEach(x => {
  //   append(lines, level, ``);
  // });
  // ast.forEach(node => {
  //   console.log(`Top-level: ${node.type}`);
  //   if (node.type === "ServiceDirective") {
  //     onServiceDirective(node, lines, level + 1);
  //   } else if (node.type === "Scalar") {
  //     onScalar(node, lines, level + 1);
  //   } else {
  //     console.log(`Unsupported `);
  //   }
  // });
  level--;
  append(lines, level, `})`);
  level--;
  append(lines, level, `}`);

  return lines.join("\n");
};

// -----------------------------------------------------------------------------
// Internal functions
// -----------------------------------------------------------------------------

const indexASTElements = elements => {
  const index = {};
  elements.forEach(el => {
    addToKeyedCollection(index, el.type, el);
  });
  return index;
};

const addToKeyedCollection = (store, key, value) => {
  if (!store[key]) {
    store[key] = [value];
  } else {
    store[key].push(value);
  }
};

// ----

const generateTypeRefs = state => {
  // Create input objects for each of the types in scope
  const typeRefs = {};

  // Intrinsics
  Object.values(IntrinsicTypes).forEach(id => {
    typeRefs[id] = generateIntrinsicTypeRef(id);
  });

  // Imported, included, or parsed
  Object.keys(state.index).forEach(key => {
    if (!isTypeRefType(key)) return;
    state.index[key].forEach(x => {
      typeRefs[x.name] = generateLocalTypeRef(x);
    });
  });

  // Add type refs to index
  state.typeRefs = typeRefs;
};

const generateIntrinsicTypeRef = id => ({
  expressionType: OfTypeSignatureType.SCALAR,
  scalar: {
    locType: LocType.ID,
    id
  }
});

const generateLocalTypeRef = type => {
  switch (type.type) {
    case TypeRefTypes.Scalar:
      return {
        expressionType: OfTypeSignatureType.SCALAR,
        scalar: {
          locType: LocType.THIS_SVC,
          name: type.name
        }
      };
    case TypeRefTypes.Type:
      return {
        expressionType: OfTypeSignatureType.TYPE,
        type: {
          locType: LocType.THIS_SVC,
          name: type.name
        }
      };
    default:
      return { todo: "@@TODO" };
  }
};

const generateImportedTypeRef = (name, id) => ({
  expressionType: OfTypeSignatureType.SCALAR,
  scalar: {
    locType: LocType.NAME_AND_SVC,
    name,
    id
  }
});

const isTypeRefType = type => Object.values(TypeRefTypes).some(x => x === type);

// ----

const processIncludes = state => {
  console.log(`@@TODO: process includes`);
};

// Imports consist of a service ID along with optional alias and
// selected imports (e.g., types, functions).  For example:
//
//   import { Location } from "io.maana.geo" as geo
//            ^               ^                 ^
//      actual import         service id        alias
//
// An imported type may be referenced either directly (e.g., Location),
// if unambiguous, or using the alias prefix (e.g., geo:Location).
const processImports = state => {
  const importAST = state.index.Import;
  if (!importAST) return;

  // Index by service id and alias (if any)
  importAST.forEach(imp => {
    console.log(`import: ${JSON.colorStringify(imp)}`);
    imp.imports.forEach(x => {
      const typeRef = generateImportedTypeRef(x, imp.service.id);
      if (!state.typeRefs[x]) {
        state.typeRefs[x] = typeRef;
      } else if (!imp.service.alias) {
        throw `Ambiguous imported type from service without alias: ${JSON.stringify(
          imp
        )}`;
      }
      // Also index the typeref by alias
      state.typeRefs[`${imp.service.alias}:${x}`] = typeRef;
    });
  });
};

// Generate AddNamedTypeInput objects for each scalar (if any)
const processScalars = state => {
  const scalarsAST = state.index.Scalar;
  if (!scalarsAST) return;

  scalarsAST.forEach(scalar => {
    const meta = scalar.directive
      ? paramsToObject(scalar.directive.parameters)
      : {};
    const input = {
      name: scalar.name,
      description: scalar.description,
      ...meta, // may override name or description
      signature: {
        signatureType: SignatureType.SCALAR,
        scalar: {
          id: `${state.service.id}:${scalar.name}`
        }
      }
    };
    state.service.addTypes.push(input);
  });
};

const processEnums = state => {
  console.log(`@@TODO: process enums`);
};

const processInterfaces = state => {
  console.log(`@@TODO: process interfaces`);
};

const directiveParameters = directive =>
  directive ? paramsToObject(directive.parameters) : {};

// Recursive
const generateFieldType = (state, graphQLType) => {
  if (graphQLType.type === GraphQLTypeTypes.GraphQLTypeRef) {
    const ref = state.typeRefs[graphQLType.name];
    if (ref) return ref;

    throw `Undefined type referenced: ${graphQLType.name}`;
  }

  if (graphQLType.type === GraphQLTypeTypes.GraphQLList) {
    return {
      expressionType: OfTypeSignatureType.LIST,
      listOf: generateFieldType(state, graphQLType.graphQLType)
    };
  }

  if (graphQLType.type === GraphQLTypeTypes.GraphQLNoNull) {
    return {
      expressionType: OfTypeSignatureType.NONULL,
      nonNullOf: generateFieldType(state, graphQLType.graphQLType)
    };
  }

  throw `Unrecognized GraphQL Type: ${JSON.stringify(graphQLType)}`;
};

const processTypes = state => {
  const typesAST = state.index.Type;
  if (!typesAST) return;

  typesAST.forEach(type => {
    // First, generate the fields
    const fields = type.fields.map(field => {
      // console.log(`Field: ${JSON.colorStringify(field)}`);
      return {
        name: field.name,
        description: field.description,
        ...directiveParameters(field.directive),
        type: generateFieldType(state, field.graphQLType)
      };
    });

    // Next, generate the type input object, referencing the fields
    const input = {
      name: type.name,
      description: type.description,
      ...directiveParameters(type.directive), // may override name or description
      signature: {
        signatureType: SignatureType.PRODUCT,
        product: {
          fields
        }
      }
    };

    // Save the input object
    state.service.addTypes.push(input);
  });
};

const processUnions = state => {
  console.log(`@@TODO: process unions`);
};

const processFunctions = state => {
  console.log(`@@TODO: process functions`);
};

// ----

const onDirectiveParameters = (node, lines, level) => {
  node.forEach(p => {
    append(lines, level, `${p.key}: ${extractValue(p.value)}`);
  });
};

const paramValueToJSON = paramValue => {
  // console.log(`paramValueToJSON: ${JSON.stringify(paramValue)}`);
  if (paramValue.type === "Array") {
    return paramValue.values.map(paramValueToJSON);
  } else {
    return paramValue.value;
  }
};

// Convert a collections of key-value pairs into a JavaScript object
const paramsToObject = params => {
  // console.log(`paramsToObject: ${JSON.stringify(params)}}`);
  const obj = {};
  params.forEach(param => {
    // console.log(`param: ${JSON.stringify(param)}}`);
    obj[param.key] = paramValueToJSON(param.value);
  });
  return obj;
};

const extractValue = value => {
  if (value.type === "String") {
    return `"${value.value}"`;
  } else if (value.type === "Array") {
    return `[${value.values.map(x => extractValue(x)).join(",")}]`;
  }
  return value.value;
};

const emitType = (typeDef, lines, level) => {
  append(lines, level, `expressionType: ${OfTypeSignatureType.TYPE}`);
  append(lines, level, `detail: ${JSON.stringify(typeDef)}`);
};

const append = (lines, level, str) => lines.push(indent(level, str));

const indent = (level, str) => "  ".repeat(level) + str;

module.exports = {
  generateAddLogicServiceMutationFromAST,
  generateAddLogicServiceInputObjectFromAST,
  generateAddLogicServiceMutationFromInputObject
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
