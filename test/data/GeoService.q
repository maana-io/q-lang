@service(
  id: "io.maana.logic.geocoord"
  name: "geo-coord"
  description: "A mock logical service for reasoning about geospatial coordinates"
  thumbnailUrl: ""
  isSystem: false
  isReadOnly: false
  tags: ["example"]
)

scalar Angle  @scalar(description: "An angular measurement")
scalar Length @scalar(description: "A length measurement")

type Location @type(description: "A geo-location")
{
  longitude:  Angle!  @field(description: "the longitude in degrees")
  latitude:   Angle!  @field(description: "the latiitude in degrees")
}

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

###