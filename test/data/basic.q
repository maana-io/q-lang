service maana-parser-test

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

interface Equals {
  eq(other: Person): Boolean!
}

type Person implements Equals & Numeric & Show {
  name: String!
  dob: Date
  children: [Person!]!
  nop(): Unit
  eq(other: Person): Boolean! {
    hi
  }
}

type Vessel {
  id: ID
}

function baz(qux: Person!): Boolean! { hi }