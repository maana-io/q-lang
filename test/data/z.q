schema PhoneDB {
  contact : String
  phone : String
} where {
  true
  false
  !true
  true /\ false
  false \/ true
  true iff false
  false => true
  (true)
  !(!((!true) \/ (!false)) /\ !((!false) \/ (!true)))
}