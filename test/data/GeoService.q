@service(
  id: "io.maana.logic.geocoord"
  name: "geo-coord"
  description: "A mock logical service for reasoning about geospatial coordinates"
  thumbnailUrl: ""
  isSystem: false
  isReadOnly: false
  tags: ["example"]
)

"""
An angular measurement
"""
scalar Angle

"A length measurement"
scalar Length

"A geo-location"
type Location {
  
  "the longitude in degrees"
  longitude: Angle!
  
  "the latiitude in degrees"
  latitude: Angle!
}