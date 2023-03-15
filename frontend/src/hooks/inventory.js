import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';
import {
  CREATE_ITEM,
  UPDATE_ITEM,
  ADD_ITEM,
  LIST_ITEMS,
  LIST_INVENTORY,
  LIST_INVENTORY_HISTORY,
  REMOVE_DEFINITION,
  REMOVE_ITEM,
  CONSUME_INVENTORY_MANUAl,
  TRANSFER_INVENTORY_ITEM,
  LIST_PENDING_CONSUMPtION_ITEMS,
} from 'apollo-client/queries';

function useInventory({
  onCreateCompleted,
  onAddCompleted,
  onRemoveDefinition,
  onRemoveDefinitionError,
  onRemoveItem,
  onRemoveItemError,
  onTransferInventory,
} = {}) {
  const { data: ItemData } = useQuery(LIST_ITEMS);
  const { data: InventoryData, refetch: refetchInventory } =
    useQuery(LIST_INVENTORY);
  const { data: InventoryHistoryData, refetch: refetchInventoryHistory } =
    useQuery(LIST_INVENTORY_HISTORY);
  const { data: consumptionData } = useQuery(LIST_PENDING_CONSUMPtION_ITEMS);

  const items = useMemo(() => R.propOr([], 'items')(ItemData), [ItemData]);
  const inventory = useMemo(
    () => R.propOr([], 'inventory')(InventoryData),
    [InventoryData]
  );
  const history = useMemo(
    () => R.propOr([], 'inventoryHistory')(InventoryHistoryData),
    [InventoryHistoryData]
  );
  const pendingConsumptionItems = useMemo(
    () => R.propOr([], 'listConsutionItems')(consumptionData),
    [consumptionData]
  );
  const inventoryWithAmount = useMemo(
    () =>
      inventory
        .filter(
          i => i.quantity > 0 && !!items.find(item => item.id === i.itemId)
        )
        .map(i => {
          const item = items.find(item => item.id === i.itemId);
          return {
            name: item.name,
            amount: i.quantity / item.quantity,
            quantity: i.quantity,
            price: i.price,
            item,
            level: i.level,
            branch: i.branch,
            specialty: i.specialty,
            user: i.doctor,
            id: i.id,
          };
        }),
    [inventory, items]
  );
  const [create, { loading: createItemLoading }] = useMutation(CREATE_ITEM, {
    onCompleted: ({ defineItem }) => {
      onCreateCompleted && onCreateCompleted(defineItem);
    },
    update(cache, { data: { defineItem } }) {
      const { items } = cache.readQuery({
        query: LIST_ITEMS,
      });
      cache.writeQuery({
        query: LIST_ITEMS,
        data: { items: [...items, defineItem] },
      });
    },
  });

  const [update, { loading: updateItemLoading }] = useMutation(UPDATE_ITEM, {
    onCompleted: ({ updateItem }) => {
      onCreateCompleted && onCreateCompleted(updateItem);
    },
    update(cache, { data: { editItem } }) {
      const { items } = cache.readQuery({
        query: LIST_ITEMS,
      });
      cache.writeQuery({
        query: LIST_ITEMS,
        data: { items: [...items, editItem] },
      });
    },
  });

  const [removeDefinition] = useMutation(REMOVE_DEFINITION, {
    onCompleted: () => {
      onRemoveDefinition && onRemoveDefinition();
    },
    onError: err => {
      onRemoveDefinitionError && onRemoveDefinitionError(err);
    },
    update(cache, { data: { removeItemDefinition: item } }) {
      cache.modify({
        fields: {
          items(existingItemsRefs, { readField }) {
            return existingItemsRefs.filter(
              ItemRef => item.id !== readField('id', ItemRef)
            );
          },
        },
      });
    },
  });

  const [removeItem] = useMutation(REMOVE_ITEM, {
    onCompleted: () => {
      onRemoveItem && onRemoveItem();
    },
    onError: err => {
      onRemoveItemError && onRemoveItemError(err);
    },
    update(cache, { data: { removeItem: item } }) {
      cache.modify({
        fields: {
          inventory(existingItemsRefs, { readField }) {
            return existingItemsRefs.filter(ItemRef => {
              const itemId = readField('itemId', ItemRef);
              const userId = readField('userId', ItemRef);
              return !(item.itemId === itemId && item.userId === userId);
            });
          },
        },
      });
    },
  });

  const [addItem, { loading: addItemLoading }] = useMutation(ADD_ITEM, {
    onCompleted: ({ addItem }) => {
      refetchInventoryHistory();
      refetchInventory();
      onAddCompleted && onAddCompleted(addItem);
    },

    update(
      cache,
      {
        data: {
          addItem: { id, quantity },
        },
      }
    ) {
      const { inventory } = cache.readQuery({
        query: LIST_INVENTORY,
      });
      cache.writeQuery({
        query: LIST_INVENTORY,
        data: {
          inventory: inventory.map(i =>
            Object.assign({}, i, i.id === id && { quantity })
          ),
        },
      });
    },
  });

  const [consumeInventoryManual] = useMutation(CONSUME_INVENTORY_MANUAl, {
    onCompleted() {
      refetchInventoryHistory();
      refetchInventory();
      Alert.success('the Inventory has been Consumed Successfully');
    },
    onError: err => {
      Alert.error(err.message);
    },
  });

  const [transferInventoryItem] = useMutation(TRANSFER_INVENTORY_ITEM, {
    onCompleted() {
      onTransferInventory && onTransferInventory();
      refetchInventoryHistory();
      refetchInventory();
      Alert.success('the Inventory has been Transfered Successfully');
    },
    onError: err => {
      Alert.error(err.message);
    },
  });

  return useMemo(
    () => ({
      create: item =>
        create({
          variables: {
            item,
          },
        }),
      addItem: item =>
        addItem({
          variables: {
            item,
          },
        }),
      update: item =>
        update({
          variables: {
            item,
          },
        }),
      removeDefinition: item =>
        removeDefinition({
          variables: {
            id: item.id,
          },
        }),
      removeItem: itemInventory => {
        removeItem({
          variables: {
            itemId: itemInventory.item.id,
          },
        });
      },
      consumeInventoryManual: data =>
        consumeInventoryManual({
          variables: {
            data,
          },
        }),
      items,
      inventoryWithAmount,
      history,
      refetchInventory,
      refetchInventoryHistory,
      createItemLoading,
      updateItemLoading,
      addItemLoading,
      transferInventoryItem,
      pendingConsumptionItems,
    }),
    [
      items,
      inventoryWithAmount,
      history,
      refetchInventory,
      refetchInventoryHistory,
      create,
      addItem,
      update,
      removeDefinition,
      removeItem,
      createItemLoading,
      updateItemLoading,
      addItemLoading,
      consumeInventoryManual,
      transferInventoryItem,
      pendingConsumptionItems,
    ]
  );
}

export default useInventory;
