service q-lang-test

import maana-core as core {
  or    # core.or(a: Boolean!, b: Boolean!): Boolean!
  head  # core.head<A>(list: [A!]): A
  tail  # core.tail<A>(list: [A!]): [A!]
}

interface Equal<A> {
  eq(other: A): Boolean!
}

type Person implements Equal<Person> {
  age: Int! @id
  name: String! @id
  eq(other: Foo): Boolean! @function(implementation:"JavaScript")
  {
    return !other ? false : age === other.age && name === other.name
  }
}

function elementOf<A => Equal<A>>(element: A, list: [A!]): Boolean! @function(implementation:"FunctionGraph")
{
  let isHeadEqual = {
    let head = core.head(list: list)
    element.eq(other: head)
  }

  let isElementOfTail = {
    let tail = core.tail(list: list)
    elementOf(element: element, list: tail)
  }

  core.or(a: isHeadEqual, b: isElementOfTail)
}


function test: Boolean! @function(implementaiton="Q") {
#  let people: List[Person] = [...]
#  let bob: Person = ...
#  let isInList = elementOf(element: bob, list: people)
}