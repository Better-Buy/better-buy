const { gql } = require('apollo-server-express')

//this is boilerplated from our ecommerce activity.
//This WILL change once we bring other components in.

const typeDefs = gql`
  type Product {
    _id: ID
    name: String
    description: String
    image: String
    price: Float
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    products(name: String): [Product]
    product(_id: ID!): Product
    user: User
    getUser(_id: ID!): User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    addProduct(
      name: String!
      description: String
      image: String
      price: Float!
      _id: ID!
    ): Product
    addOrder(products: [ID]!): Order
    updateUser(
      _id: ID!
      firstName: String
      lastName: String
      email: String
      password: String
    ): Auth
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
  }
`

module.exports = typeDefs
