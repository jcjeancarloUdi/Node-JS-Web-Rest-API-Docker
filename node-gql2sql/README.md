# GQL2SQL API Service


## Installation / Development

**Prerequisites:**

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/en/)
* [Babel](https://babeljs.io/docs/usage/cli/)
* MSSQL (with an Items table as described in `models/users/UserModel.js`)

**Installation:**

1. Install dependencies: `npm install` or `yarn install`
2. Run the service: `npm start` or `yarn dev`

**Testing:**

1. `npm test` will run any tests in the `test` folder

## Schema / Models

Currently only a generic model of "Items" has been implemented. It can serve as a guide to add more models to expose (both in Sequelize and GraphQL).

## Execuções
URL: http://localhost:9000/graphql

## GraphiQL:

# Mutation addUser
mutation {
  addUser(id: 4, name: "teste", email: "teste@corporate.com", password: "teste", hasChanged: false) {
    id
    name
  }
}

# GET Registros
{
  users(name: "teste2") {
    id
    name
    hasChanged
  }
}

#ou

{
  users(id: 4) {
    id
    name
    hasChanged
  }
}