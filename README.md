# graphql-test
This is a test on how to integrate and use GraphQL on a Node.js project.

To use run `npm install` then `npm run compile && npm run dev`.

Here some queries and mutators for test.
```
query Getclasses {
  shipclasses {
    id,
    name,
    year
  }
}
query Getships {
  ships {
    name,
    code,
    shipclass {
      name,
      year
    }
  }
}
mutation AddClass(
  $id: String,
  $name: String,
  $year: Int
) {
  addShipclass( input: {
    id: $id,
    name: $name,
    year: $year
  }) {
    id
  }
}

mutation AddShip(
  $name: String,
  $code: String
) {
  addShip( input: {
    name: $name,
    code: $code
  }) {
    name
  }
}

mutation editUser {
  editShip(id: "5c3fd46c331dd25ce20af810", input: {
    shipclassId: "5c3fd397331dd25ce20af80f"
  }) {
    
    shipclass {
			name
    }
  }
}
```