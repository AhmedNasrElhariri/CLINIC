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
    }
  }
`;

export const LIST_INVENTORY = gql`
  query inventory {
    inventory {
      id
      itemId
      userId
      quantity
      level
      branch{
        id
        name
      }
      specialty{
        id
        name
      }
      doctor{
        id
        name
      }
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
      id
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
