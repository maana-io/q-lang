# at least 1 .q file must have a service declaration
# at least 1 .q file must have a service declaration
service maana-parser-test @service(name: "Parser Test", description: "This is a description")


# additional .q file for same service
# extends service maana-parser-test

import io.maana.core as core {
  head
  tail
}

import 24aa07c4-6b98-4fa5-b1b3-33a3e44a20b5 as math {
  min
  max
  abs
  exp
}

interface Equals<A> {
  eq(other: A): Boolean!
}

type Person implements Equals<Person> & Numeric & Show {
  name: String!
  dob: Date
  children: [Person!]!
  nop(): Unit
  eq(other: Person): Boolean! @function(lang: "js") {
  }
}

type Vessel {
  id: ID
}

function baz(qux: Person!): Boolean! { hi }