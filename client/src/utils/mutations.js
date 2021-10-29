import { gql } from '@apollo/client';
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
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;


export const ADD_PRODUCT = gql`
  mutation addProduct(
    $title: String!
    $description: String!
    $price: String!
  ) {
    addProduct(
      title: $title
      description: $description
      price: $price
    ) 
      user {
        _id
      }
  }
`;