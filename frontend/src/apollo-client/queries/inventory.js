import gql from 'graphql-tag';

export const LIST_ITEMS = gql`
  query items {
    items {
      id
      name
      unitOfMeasure
      quantity
      barcode
      notes
      level
    }
  }
`;

export const LIST_INVENTORY = gql`
  query inventory {
    inventory {
      itemId
      userId
      quantity
    }
  }
`;

export const LIST_INVENTORY_HISTORY = gql`
  query inventoryHistory {
    inventoryHistory {
      body
      date
    }
  }
`;

export const CREATE_ITEM = gql`
  mutation defineItem($item: ItemInput!) {
    defineItem(item: $item) {
      id
      name
      unitOfMeasure
      notes
    }
  }
`;

export const UPDATE_ITEM = gql`
  mutation editItem($item: ItemUpdateInput!) {
    editItem(item: $item) {
      id
      name
    }
  }
`;

export const ADD_ITEM = gql`
  mutation addItem($item: AddToInventoryInput!) {
    addItem(item: $item) {
      itemId
      quantity
    }
  }
`;

export const REMOVE_DEFINITION = gql`
  mutation removeItemDefinition($id: ID!) {
    removeItemDefinition(id: $id) {
      id
    }
  }
`;

export const REMOVE_ITEM = gql`
  mutation removeItem($itemId: ID!) {
    removeItem(itemId: $itemId) {
      itemId
      userId
    }
  }
`;
