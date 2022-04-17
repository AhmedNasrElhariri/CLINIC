import gql from 'graphql-tag';

export const LIST_SALESES_DEFINITION = gql`
  {
    mySalesesDefinition {
      id
      name
      totalQuantity
      price
      cost
      level
      user {
        id
        name
      }
      branch {
        id
        name
      }
      specialty {
        id
        name
      }
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
  mutation editSalesDefinition(
    $salesDefinition: SalesInputDefinition!
    $type: String!
  ) {
    editSalesDefinition(salesDefinition: $salesDefinition, type: $type) {
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
  query mySaleses(
    $offset: Int
    $limit: Int
    $dateFrom: Date
    $dateTo: Date
    $view: String
    $branchId: ID
    $specialtyId: ID
    $doctorId: ID
  ) {
    mySaleses(
      offset: $offset
      limit: $limit
      dateFrom: $dateFrom
      dateTo: $dateTo
      view: $view
      branchId: $branchId
      specialtyId: $specialtyId
      doctorId: $doctorId
    ) {
      sales {
        id
        totalPrice
        totalCost
        quantity
        date
        user {
          id
          name
        }
        salesDefinition {
          id
          name
          price
        }
        branch {
          id
          name
        }
        specialty {
          id
          name
        }
      }
      totalSalesPrice
      totalSalesCost
      salesCounts
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
