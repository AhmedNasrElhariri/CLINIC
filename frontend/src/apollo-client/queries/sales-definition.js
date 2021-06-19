import gql from 'graphql-tag';

export const LIST_SALESES_DEFINITION = gql`
  {
    mySalesesDefinition {
      id
      name
      totalQuantity
      price
      cost
    }
  }
`;

export const ADD_SALES_DEFINITION = gql`
  mutation addSalesDefinition($salesDefinition: SalesInputDefinition!) {
    addSalesDefinition(salesDefinition: $salesDefinition) {
      id
      name
      totalQuantity
      price
      cost
    }
  }
`;

export const EDIT_SALES_DEFINITION = gql`
  mutation editSalesDefinition($salesDefinition: SalesInputDefinition!) {
    editSalesDefinition(salesDefinition: $salesDefinition) {
      id
      name
      totalQuantity
      price
      cost
    }
  }
`;

export const ADD_SALES_DEFINITION_QUENTITY = gql`
  mutation addSalesDefinitionQuantity($salesDefinition: SalesInputDefinition!) {
    addSalesDefinitionQuantity(salesDefinition: $salesDefinition) {
      id
      name
      totalQuantity
      price
      cost
    }
  }
`;

export const LIST_SALESES = gql`
  {
    mySaleses {
      id
      totalPrice
      totalCost
      quantity
      date
      user{
        id
        name
      }
      salesDefinition {
        name
        price
      }
    }
  }
`;

export const ADD_SALES = gql`
  mutation addSales($sales: [SalesItemsInput!]!) {
    addSales(sales: $sales) {
      id
      quantity
      totalPrice
    }
  }
`;

export const DELETE_SALES = gql`
  mutation deleteSales($id: ID!) {
    deleteSales(id: $id) {
      id
    }
  }
`;

export const EDIT_SALES = gql`
  mutation editSales($sales: SalesInput!) {
    editSales(sales: $sales) {
      id
      quantity
      totalPrice 
    }
  }
`;
