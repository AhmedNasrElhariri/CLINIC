import gql from 'graphql-tag';

export const LIST_PRICES = gql`
  {
    myPrices {
      id
      Apptype
      price
      level
      user{
        id
        name
      }
      branch{
        id
        name
      }
      specialty{
        id
        name
      }
    }
  }
`;

export const ADD_PRICE = gql`
  mutation addPrice($price: PriceInput!) {
    addPrice(price: $price) {
      id
      Apptype
    }
  }
`;

export const EDIT_PRICE = gql`
  mutation editPrice($price: PriceInput!) {
    editPrice(price: $price) {
      id
      Apptype
    }
  }
`;

export const LIST_SESSIONS_DEFINITION = gql`
  {
    mySessionsDefinition {
      id
      name
      price
      duration
    }
  }
`;

export const ADD_SESSION_DEFINITION = gql`
  mutation addSessionDefinition($sessionDefinition: SessionInputDefinition!) {
    addSessionDefinition(sessionDefinition: $sessionDefinition) {
      id
      name
      price
      duration
    }
  }
`;

export const EDIT_SESSION_DEFINITION = gql`
  mutation editSessionDefinition($sessionDefinition: SessionInputDefinition!) {
    editSessionDefinition(sessionDefinition: $sessionDefinition) {
      id
      name
      price
      duration
    }
  }
`;
