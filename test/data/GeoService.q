###

import {
  AddLogicServiceInput,
  AddNamedTypeInput,
  SignatureType,
  OfTypeSignatureType,
  LocType,
  TypeExpressionInput
} from "../../schemas/gen-types"

###

###

export const GEO_SERVICE_ID = "io.maana.logic.geocoord"

// Service Definition
export const geoCoordinateServiceInput: AddLogicServiceInput = {
  id: GEO_SERVICE_ID,
  name: "geo-coord",
  description: "A mock logical service for reasoning about geospatial coordinates",
  thumbnailUrl: "",
  isSystem: false,
  isReadOnly: false,
  tags: ["example"],
  addTypes: geoCoordTypes,
  addFunctions: []
}

###

@service(
  id: "io.maana.logic.geocoord"
  name: "geo-coord"
  description: "A mock logical service for reasoning about geospatial coordinates"
  thumbnailUrl: ""
  isSystem: false
  isReadOnly: false
  tags: ["example"]
)

###

const AngleRef: TypeExpressionInput = {
  expressionType: OfTypeSignatureType.SCALAR,
  scalar: {
    locType: LocType.THIS_SVC,
    name: "Angle"
  }
}
const LengthRef: TypeExpressionInput = {
  expressionType: OfTypeSignatureType.SCALAR,
  scalar: {
    locType: LocType.THIS_SVC,
    name: "Length"
  }
}
const LocationRef: TypeExpressionInput = {
  expressionType: OfTypeSignatureType.TYPE,
  type: {
    locType: LocType.THIS_SVC,
    name: "Location"
  }
}

const geoCoordTypes: AddNamedTypeInput[] = [
  {
    name: "Angle",
    description: "An angular measurement",
    signature: {
      signatureType: SignatureType.SCALAR,
      scalar: { id: `${GEO_SERVICE_ID}:Angle` }
    }
  },
  {
    name: "Length",
    description: "A length measurement",
    signature: {
      signatureType: SignatureType.SCALAR,
      scalar: { id: `${GEO_SERVICE_ID}:Length` }
    }
  },
  {
    name: "Location",
    description: "A geo-location",
    signature: {
      signatureType: SignatureType.PRODUCT,
      product: {
        fields: [
          {
            name: "longitude",
            description: "the longitude in degrees",
            type: {
              expressionType: OfTypeSignatureType.NONULL,
              nonNullOf: AngleRef
            }
          },
          {
            name: "latitude",
            description: "the latitude in degrees",
            type: {
              expressionType: OfTypeSignatureType.NONULL,
              nonNullOf: AngleRef
            }
          }
        ]
      }
    }
  }
]

"""