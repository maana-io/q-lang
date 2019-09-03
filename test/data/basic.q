service maana-parser-test @service(name: "Parser Test", description: "This is a description")

interface Equals<A> {
  eq(other: A): Boolean!
}

type Person implements Equals<Person> & Numeric & Show {
  name: String!
  dob: Date
  children: [Person!]!
  nop: Unit
}

type Vessel {
  id: ID
}

function baz(qux: Person!): Boolean! { hi }