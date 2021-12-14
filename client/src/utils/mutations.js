import { gql } from '@apollo/client'
//original poster
//ADD USER ID TO POST. MUST KNOW POSTER.

//adding backend for adding user.
export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`

export const UPDATE_USER = gql`
  mutation updateUser(
    $_id: ID!
    $firstName: String
    $lastName: String
    $email: String
    $password: String
  ) {
    updateUser(
      _id: $_id
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`

export const ADD_PRODUCT = gql`
  mutation addProduct(
    $name: String!
    $description: String
    $image: String
    $price: Float!
    $_id: ID!
  ) {
    addProduct(
      name: $name
      description: $description
      image: $image
      price: $price
      _id: $_id
    ) {
      name
      description
      image
      price
      _id
    }
  }
`
