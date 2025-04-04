// graphql/schema.js
const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Character {
    id: ID!
    name: String!
    status: String
    species: String
    type: String
    gender: String
    origin: String
    image: String
  }

  type Query {
    characters(
      name: String
      status: String
      species: String
      gender: String
      origin: String
    ): [Character]
  }
`);



module.exports = { schema };