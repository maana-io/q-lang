# Based on https://bitbucket.corp.maana.io/projects/H4/repos/new-ckg/browse/catalog-service/src/test/tests/functionGraph/addFunctionGraph.ts

@service(
  id: "io.maana.logic.goodexamples"
  name: "Rig Examples"
  description: "A mock logical service for reasoning about rigs and equipment"
  thumbnailUrl: null
  isSystem: false
  isReadOnly: false
  tags: ["example"]
)

"A phone number"
scalar Phone

"A pressure in PSIG"
scalar Pressure

"A dummy training datapoint for a failure model"
scalar TrainingData

"A person"
type Person {
  
  "A unique descriptor"
  id: ID!
  
  "A unique human readable descriptor"
  name: String!
  
  "A person's primary phone number"
  phone:Phone
}

###

  // Add the "Person" Product type.
  {
    name: "Person",
    description: "A Person",
    signature: {
      signatureType: SignatureType.PRODUCT,
      product: {
        fields: [
          {
            name: "id",
            description: "A unique descriptor",
            type: {
              expressionType: OfTypeSignatureType.NONULL,
              nonNullOf: IDRef
            }
          },
          {
            name: "name",
            description: "A unique human readable descriptor",
            type: {
              expressionType: OfTypeSignatureType.NONULL,
              nonNullOf: StringRef
            }
          },
          //{name:"address", description:"the person"s home address", type: new NonNullType({ of: GeoLocationRef }) }),
          {
            name: "phone",
            description: "A person"s primary phone number",
            type: PhoneRef
          }
        ]
      }
    }
  },
  // Add the "Manufacturer" Product type
  {
    name: "Manufacturer",
    description: "A Manufacturer",
    signature: {
      signatureType: SignatureType.PRODUCT,
      product: {
        fields: [
          {
            name: "id",
            description: "A unique descriptor",
            type: {
              expressionType: OfTypeSignatureType.NONULL,
              nonNullOf: IDRef
            }
          },
          {
            name: "name",
            description: "A unique human readable descriptor",
            type: {
              expressionType: OfTypeSignatureType.NONULL,
              nonNullOf: StringRef
            }
          },
          {
            name: "representatives",
            description: "the manufacturer"s representatives",
            type: {
              expressionType: OfTypeSignatureType.LIST,
              listOf: PersonRef
            }
          }
        ]
      }
    }
  },
  // Add the "Pipe" Product type
  {
    name: "Pipe",
    description: "A Pipe",
    signature: {
      signatureType: SignatureType.PRODUCT,
      product: {
        fields: [
          {
            name: "pressureRating",
            description: "the maximum rated pressure of the pipe in PSIG",
            type: PressureRef
          },
          {
            name: "length",
            description: "The length of the pipe in feet",
            type: {
              expressionType: OfTypeSignatureType.NONULL,
              nonNullOf: LengthRef
            }
          },
          {
            name: "insideDiameter",
            description: "The insideDiameter of the pipe, in inches",
            type: {
              expressionType: OfTypeSignatureType.NONULL,
              nonNullOf: LengthRef
            }
          },
          {
            name: "hoursInService",
            description: "The number of hours that the equipment has been in service",
            type: LongRef
          }
        ]
      }
    }
  },
  // Add the "Pump" Product type
  {
    name: "Pump",
    description: "A Pump",
    signature: {
      signatureType: SignatureType.PRODUCT,
      product: {
        fields: [
          {
            name: "id",
            description: "A unique descriptor",
            type: {
              expressionType: OfTypeSignatureType.NONULL,
              nonNullOf: IDRef
            }
          },
          {
            name: "manufacturer",
            description: "the manufacturer of the asset",
            type: {
              expressionType: OfTypeSignatureType.NONULL,
              nonNullOf: ManufacturerRef
            }
          },
          {
            name: "partNo",
            description: "the manufacturer"s part number for the asset",
            type: {
              expressionType: OfTypeSignatureType.NONULL,
              nonNullOf: StringRef
            }
          },
          {
            name: "ratedCapacity",
            description: "the rated flow rate in GPM at nominal backpressure",
            type: DoubleRef
          },
          {
            name: "hoursInService",
            description: "The number of hours that the equipment has been in service",
            type: LongRef
          }
        ]
      }
    }
  },
  // Add the "Valve" Product type
  {
    name: "Valve",
    description: "A Valve",
    signature: {
      signatureType: SignatureType.PRODUCT,
      product: {
        fields: [
          {
            name: "id",
            description: "A unique descriptor",
            type: {
              expressionType: OfTypeSignatureType.NONULL,
              nonNullOf: IDRef
            }
          },
          {
            name: "manufacturer",
            description: "the manufacturer of the asset",
            type: {
              expressionType: OfTypeSignatureType.NONULL,
              nonNullOf: ManufacturerRef
            }
          },
          {
            name: "partNo",
            description: "the manufacturer"s part number for the asset",
            type: {
              expressionType: OfTypeSignatureType.NONULL,
              nonNullOf: StringRef
            }
          },
          {
            name: "valveCoefficient",
            description: "The valve coefficient in SI units",
            type: DoubleRef
          },
          {
            name: "hoursInService",
            description: "The number of hours that the equipment has been in service",
            type: LongRef
          }
        ]
      }
    }
  },
  // Add the "Asset" Product type
  {
    name: "Asset",
    description: "An Asset",
    signature: {
      signatureType: SignatureType.PRODUCT,
      product: {
        fields: [
          {
            name: "id",
            description: "A unique descriptor",
            type: {
              expressionType: OfTypeSignatureType.NONULL,
              nonNullOf: IDRef
            }
          },
          {
            name: "manufacturer",
            description: "the manufacturer of the asset",
            type: {
              expressionType: OfTypeSignatureType.NONULL,
              nonNullOf: ManufacturerRef
            }
          },
          {
            name: "partNo",
            description: "the manufacturer"s part number for the asset",
            type: {
              expressionType: OfTypeSignatureType.NONULL,
              nonNullOf: StringRef
            }
          }
        ]
      }
    }
  },
  // Add the "Equipment" Sum type
  {
    name: "Equipment",
    description: "A piece of Equipment",
    signature: {
      signatureType: SignatureType.SUM,
      sum: {
        variants: [
          {
            expressionType: OfTypeSignatureType.TYPE,
            type: {
              locType: LocType.THIS_SVC,
              name: "Pipe"
            }
          },
          {
            expressionType: OfTypeSignatureType.TYPE,
            type: {
              locType: LocType.THIS_SVC,
              name: "Pump"
            }
          },
          {
            expressionType: OfTypeSignatureType.TYPE,
            type: {
              locType: LocType.THIS_SVC,
              name: "Valve"
            }
          }
        ]
      }
    }
  },
  // Add the "Rig" Product type
  {
    name: "Rig",
    description: "An oil Rig",
    signature: {
      signatureType: SignatureType.PRODUCT,
      product: {
        fields: [
          {
            name: "id",
            description: "A unique descriptor",
            type: {
              expressionType: OfTypeSignatureType.NONULL,
              nonNullOf: IDRef
            }
          },
          {
            name: "name",
            description: "A unique human readable descriptor",
            type: {
              expressionType: OfTypeSignatureType.NONULL,
              nonNullOf: StringRef
            }
          },
          {
            name: "equipment",
            description: "the equipment on the rig",
            type: {
              expressionType: OfTypeSignatureType.LIST,
              listOf: {
                expressionType: OfTypeSignatureType.NONULL,
                nonNullOf: EquipmentRef
              }
            }
          },
          {
            name: "personnel",
            description: "the people who work on the rig",
            type: {
              expressionType: OfTypeSignatureType.LIST,
              listOf: {
                expressionType: OfTypeSignatureType.NONULL,
                nonNullOf: PersonRef
              }
            }
          },
          {
            name: "location",
            description: "the geographical location",
            type: LocationRef
          }
        ]
      }
    }
  },
  // Add Failure Model type
  {
    name: "FailureModel",
    description: "A model for predicting the likelihood of failure of equipment in service",
    signature: {
      signatureType: SignatureType.PRODUCT,
      product: {
        fields: [
          {
            name: "trainingData",
            description: "the failure data that was used to train the model",
            type: {
              expressionType: OfTypeSignatureType.LIST,
              listOf: {
                expressionType: OfTypeSignatureType.NONULL,
                nonNullOf: TrainingDataRef
              }
            }
          },
          {
            name: "likelyToFail",
            description: "A parametric failure model",
            type: {
              expressionType: OfTypeSignatureType.FUNCTION,
              function: {
                arguments: [
                  { name: "tolerance", type: DoubleRef },
                  { name: "equipment", type: EquipmentRef }
                ],
                resultType: BooleanRef
              }
            }
          }
        ]
      }
    }
  },
  {
    name: "Example6Result",
    description: "A tuple for holding the results of example 6",
    signature: {
      signatureType: SignatureType.PRODUCT,
      product: {
        fields: [
          {
            name: "id",
            description: "A unique descriptor",
            type: {
              expressionType: OfTypeSignatureType.NONULL,
              nonNullOf: IDRef
            }
          },
          {
            name: "manufacturer",
            description: "The asset manufacturer"s name",
            type: {
              expressionType: OfTypeSignatureType.NONULL,
              nonNullOf: StringRef
            }
          },
          {
            name: "phones",
            description: "The primary phone numbers of the manufacturer"s representatives",
            type: {
              expressionType: OfTypeSignatureType.LIST,
              listOf: PhoneRef
            }
          }
        ]
      }
    }
  },
  // Add the "Example8Result" Product type
  {
    name: "Example8Result",
    description: "A tuple for holding the results of example 8",
    signature: {
      signatureType: SignatureType.PRODUCT,
      product: {
        fields: [
          {
            name: "name",
            description: "A unique human readable descriptor",
            type: {
              expressionType: OfTypeSignatureType.NONULL,
              nonNullOf: StringRef
            }
          },
          {
            name: "phone",
            description: "The primary phone number of a person",
            type: PhoneRef
          }
        ]
      }
    }
  },
  // Add the "Example9Result" Product type
  {
    name: "Example9Result",
    description: "A tuple for holding the results of example 9",
    signature: {
      signatureType: SignatureType.PRODUCT,
      product: {
        fields: [
          {
            name: "names",
            description: "A unique human readable descriptor",
            type: {
              expressionType: OfTypeSignatureType.LIST,
              listOf: {
                expressionType: OfTypeSignatureType.NONULL,
                nonNullOf: StringRef
              }
            }
          },
          {
            name: "phones",
            description: "The primary phone number of a person",
            type: {
              expressionType: OfTypeSignatureType.LIST,
              listOf: PhoneRef
            }
          }
        ]
      }
    }
  }
]
###









###
const exampleFunction1: AddCKGFunctionInput = {
  name: "example1",
  description: "What are all the equipment on a given rig?",
  isEmbedded: false,
  isPure: true,
  signature: {
    arguments: [
      {
        name: "rig",
        type: {
          expressionType: OfTypeSignatureType.NONULL,
          nonNullOf: RigRef
        }
      }
    ],
    resultType: {
      expressionType: OfTypeSignatureType.LIST,
      listOf: {
        expressionType: OfTypeSignatureType.NONULL,
        nonNullOf: EquipmentRef
      }
    }
  },
  graphqlFunctionType: GraphQLFunctionType.QUERY,
  operations: [],
  projections: [
    {
      id: "p1",
      typeOf: RigRef,
      field: "equipment"
    }
  ],
  constructions: [],
  subgraphs: [],
  values: [],
  connections: [
    {
      from: {
        graphRefInputType: GraphRefInputType.ARGUMENT,
        argumentRef: "rig"
      },
      to: {
        graphRefInputType: GraphRefInputType.OPERATION_ARGUMENT,
        operationArgument: {
          operation: "p1",
          argument: "input"
        }
      }
    },
    {
      from: {
        graphRefInputType: GraphRefInputType.OPERATION_RESULT,
        operationResult: "p1"
      },
      to: {
        graphRefInputType: GraphRefInputType.FUNCTION_RESULT
      }
    }
  ],
  implementation: ImplementationTypeInput.FUNCTION_GRAPH
}

const exampleFunction6: AddCKGFunctionInput = {
  name: "example6",
  description:
    "given an asset, return the asset id, the manufacturer"s name, and the phone numbers of all the manufacturer"s representatives.",
  isEmbedded: false,
  isPure: true,
  signature: {
    arguments: [
      {
        name: "asset",
        type: {
          expressionType: OfTypeSignatureType.NONULL,
          nonNullOf: AssetRef
        }
      }
    ],
    resultType: Example6ResultRef
  },
  graphqlFunctionType: GraphQLFunctionType.QUERY,
  operations: [
    {
      id: "m1",
      function: MapFunctionLocator
    }
  ],
  projections: [
    {
      id: "p1",
      typeOf: AssetRef,
      field: "id"
    },
    {
      id: "p2",
      typeOf: AssetRef,
      field: "manufacturer"
    },
    {
      id: "p3",
      typeOf: ManufacturerRef,
      field: "name"
    },
    {
      id: "p4",
      typeOf: ManufacturerRef,
      field: "representatives"
    }
  ],
  constructions: [
    {
      id: "c1",
      typeOf: Example6ResultRef
    }
  ],
  subgraphs: [
    {
      id: "example6.g1",
      /* @@TODO
      signature: {
        arguments: [
          {
            name: "person",
            type: PersonRef
          }
        ],
        resultType: PhoneRef
      },*/
      addOperations: [],
      addProjections: [
        {
          id: "p5",
          typeOf: PersonRef,
          field: "phone"
        }
      ],
      addConstructions: [],
      addSubgraphs: [],
      addValues: [],
      addConnections: [
        connectionFromArgumentToOperationArgument("person", "p5", "input"),
        {
          from: {
            graphRefInputType: GraphRefInputType.OPERATION_RESULT,
            operationResult: "p5"
          },
          to: {
            graphRefInputType: GraphRefInputType.FUNCTION_RESULT
          }
        }
      ]
    }
  ],
  values: [],
  connections: [
    connectionFromArgumentToOperationArgument("asset", "p1", "input"),
    connectionFromArgumentToOperationArgument("asset", "p2", "input"),
    connectFromOperationResultToOperationArgument("p2", "p3", "input"),
    connectFromOperationResultToOperationArgument("p2", "p4", "input"),
    connectFromOperationResultToOperationArgument("p4", "m1", "list"),
    connectFromOperationResultToOperationArgument("example6.g1", "m1", "function"),
    connectFromOperationResultToOperationArgument("p1", "c1", "id"),
    connectFromOperationResultToOperationArgument("p3", "c1", "manufacturer"),
    connectFromOperationResultToOperationArgument("m1", "c1", "phones"),
    {
      from: {
        graphRefInputType: GraphRefInputType.OPERATION_RESULT,
        operationResult: "c1"
      },
      to: {
        graphRefInputType: GraphRefInputType.FUNCTION_RESULT
      }
    }
  ],
  implementation: ImplementationTypeInput.FUNCTION_GRAPH
}

async function bootstrapStore(store: Store) {
  let tx = new BootstrapCatalogTransaction({
    store: store
  })

  await tx.buildAndValidate()

  return tx.commit()
}

async function addGeoCoordService(store: Store) {
  let tx = new AddLogicServiceTransaction(geoCoordinateServiceInput, { store: store })

  await tx.buildAndValidate()

  return tx.commit()
}

function txEffectCounter(
  transaction: AddLogicServiceTransaction,
  debugLog: boolean = false
): [number, number, number] {
  let typeCount = 0
  let fxCount = 0
  let subgraphCount = 0

  transaction.effects.forEach(effect => {
    if (effect instanceof AddServiceEffect) {
      if (debugLog) console.log(`Service: ${JSON.stringify(effect)}\n`)
    } else if (effect instanceof AddLocationEffect) {
      if (debugLog) console.log(`Location: ${JSON.stringify(effect)}\n`)
    } else if (effect instanceof AddTypeEffect) {
      if (debugLog) console.log(`Type: ${JSON.stringify(effect)}\n`)
      typeCount++
    } else if (effect instanceof AddFunctionEffect) {
      if (debugLog) console.log(`Function: ${JSON.stringify(effect)}\n`)
      fxCount++
    } else if (effect instanceof AddFunctionGraphNodeEffect) {
      if (debugLog) console.log(`FunctionGraphNode: ${JSON.stringify(effect)}\n`)
      if (effect.node instanceof SubgraphNode) {
        subgraphCount++
      }
    } else if (effect instanceof AddFunctionGraphConnectionEffect) {
      if (debugLog) console.log(`FunctionGraphConnection: ${JSON.stringify(effect)}\n`)
    }
  })

  return [typeCount, fxCount, subgraphCount]
}

it("builds example1 logic service", async () => {
  const store = new InMemoryStore()

  // Bootstrap the store so that our test services can reference system
  // types and functions
  await bootstrapStore(store)

  // Add referenced service(s)
  await addGeoCoordService(store)

  // Service Definition
  const logicServiceInput: AddLogicServiceInput = {
    ...logicServiceTemplate,
    addTypes: addTypeInputs,
    addFunctions: [exampleFunction1]
  }

  const logicTx = new AddLogicServiceTransaction(logicServiceInput, { store: store })

  await logicTx.buildAndValidate()

  const [typeCount, fxCount, subgraphCount] = txEffectCounter(logicTx)

  expect(typeCount).toBe(addTypeInputs.length)
  expect(fxCount).toBe(1)

  expect(await logicTx.commit()).toMatchObject({
    id: logicServiceInput.id!,
    name: logicServiceInput.name!
  })

  const rigFunctions = await store.functionsOfService(RIG_SERVICE_ID)
  console.log(`DEBUG rigFunctions\n${JSON.stringify(rigFunctions)}`)
})

it("builds a service with subgraph", async () => {
  const store = new InMemoryStore()

  await bootstrapStore(store)
  await addGeoCoordService(store)

  const serviceWithSubgraphInput: AddLogicServiceInput = {
    ...logicServiceTemplate,
    addTypes: addTypeInputs,
    addFunctions: [exampleFunction6]
  }

  const logicTx = new AddLogicServiceTransaction(serviceWithSubgraphInput, { store: store })
  await logicTx.buildAndValidate()

  const [typeCount, fxCount, subgraphCount] = txEffectCounter(logicTx, true)

  expect(typeCount).toBe(addTypeInputs.length)
  expect(fxCount).toBe(1)
  expect(subgraphCount).toBe(1)
})

###