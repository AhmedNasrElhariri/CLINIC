import gql from 'graphql-tag';

export const LIST_ITEMS = gql`
  query items {
    items {
      id
      name
      unitOfMeasure
      quantity
      sellingPricePerBox
      sellingPricePerUnit
      alertNumberOfBoxes
      sellable
    }
  }
`;

export const LIST_INVENTORY = gql`
  query inventory($branchId: ID, $specialtyId: ID, $doctorId: ID) {
    inventory(
      branchId: $branchId
      specialtyId: $specialtyId
      doctorId: $doctorId
    ) {
      id
      itemId
      userId
      quantity
      price
      level
      barColor
      item {
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
      doctor {
        id
        name
      }
    }
  }
`;

export const LIST_INVENTORY_HISTORY = gql`
  query inventoryHistory($isSelling: Boolean) {
    inventoryHistory(isSelling: $isSelling) {
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
      quantity
      sellingPricePerUnit
      sellingPricePerBox
      alertNumberOfBoxes
      sellable
    }
  }
`;

export const UPDATE_ITEM = gql`
  mutation editItem($item: ItemUpdateInput!) {
    editItem(item: $item) {
      id
      name
      unitOfMeasure
      quantity
      sellingPricePerUnit
      sellingPricePerBox
      alertNumberOfBoxes
      sellable
    }
  }
`;

export const ADD_ITEM = gql`
  mutation addItem($item: AddToInventoryInput!) {
    addItem(item: $item) {
      id
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

export const CONSUME_INVENTORY_MANUAl = gql`
  mutation consumeInventoryManual($data: InventoryConsumedItemInput!) {
    consumeInventoryManual(data: $data) {
      id
      quantity
    }
  }
`;

export const TRANSFER_INVENTORY_ITEM = gql`
  mutation transferInventoryItem($input: TransferInventoryItemsInput!) {
    transferInventoryItem(input: $input) {
      id
    }
  }
`;

export const LIST_PENDING_CONSUMPtION_ITEMS = gql`
  {
    listConsutionItems {
      id
      numberOfUnits
      price
      insertionDate
      fromInventoryItemId
      inventoryItem {
        item {
          name
          quantity
        }
        branch {
          name
        }
      }
    }
  }
`;
export const TRANSFER_ACTION = gql`
  mutation transferAction($id: ID!, $fromInventoryItemId: ID!, $type: String!) {
    transferAction(
      id: $id
      fromInventoryItemId: $fromInventoryItemId
      type: $type
    ) {
      inventoryItemConsumption {
        id
      }
      accept
    }
  }
`;
