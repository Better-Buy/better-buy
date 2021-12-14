import { gql } from '@apollo/client'

export const QUERY_USER = gql`
  {
    user {
      _id
      firstName
      lastName
      email
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`

export const GET_USER = gql`
  query getUser {
    user {
      _id
      firstName
      lastName
      email
    }
  }
`
