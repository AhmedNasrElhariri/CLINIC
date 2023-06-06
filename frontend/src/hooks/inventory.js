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
  TRANSFER_ACTION,
  RECONCILATE_SALES,
  LIST_SALESES,
} from 'apollo-client/queries';

function useInventory({
  onCreateCompleted,
  onAddCompleted,
  onRemoveDefinition,
  onRemoveDefinitionError,
  onRemoveItem,
  onRemoveItemError,
  onTransferInventory,
  onConsumeInventory,
  isSelling,
  branchId,
  specialtyId,
  doctorId,
  onReconsilate,
  itemId,
  dateFrom,
  dateTo,
  page,
} = {}) {
  const { data: ItemData } = useQuery(LIST_ITEMS);
  const { data: InventoryData, refetch: refetchInventory } = useQuery(
    LIST_INVENTORY,
    {
      variables: Object.assign(
        {},
        branchId && { branchId: branchId },
        specialtyId && { specialtyId: specialtyId },
        doctorId && { doctorId: doctorId }
      ),
      fetchPolicy: 'cache-and-network',
    }
  );

  const { data: InventoryHistoryData, refetch: refetchInventoryHistory } =
    useQuery(LIST_INVENTORY_HISTORY, {
      variables: Object.assign(
        { isSelling: isSelling, offset: (page - 1) * 30 || 0, limit: 30 },
        itemId && { itemId: itemId },
        dateFrom && { dateFrom: dateFrom },
        dateTo && { dateTo: dateTo }
      ),
    });

  const { data: consumptionData, refetch: refetchPendingConsumption } =
    useQuery(LIST_PENDING_CONSUMPtION_ITEMS);

  const items = useMemo(() => R.propOr([], 'items')(ItemData), [ItemData]);

  const inventory = useMemo(
    () => R.propOr([], 'inventory')(InventoryData),
    [InventoryData]
  );

  const historyData = InventoryHistoryData?.inventoryHistory;
  const history = useMemo(
    () => R.propOr([], 'history')(historyData),
    [historyData]
  );
  const historyCounts = useMemo(
    () => R.propOr(0, 'inventoryCounts')(historyData),
    [historyData]
  );
  const inventoryPages = Math.ceil(historyCounts / 30);

  const pendingConsumptionItems = useMemo(
    () => R.propOr([], 'listConsutionItems')(consumptionData),
    [consumptionData]
  );
  const inventoryWithAmount = useMemo(() => {
    return inventory
      .filter(i => i.quantity > 0 && !!items.find(item => item.id === i.itemId))
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
          barColor: i.barColor,
        };
      });
  }, [inventory, items]);
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
      const newItems = items.map(i => (i.id === editItem.id ? editItem : i));
      cache.writeQuery({
        query: LIST_ITEMS,
        data: {
          items: [...newItems],
        },
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
    onError: err => {
      Alert.error(err.message);
    },
  });

  const [consumeInventoryManual] = useMutation(CONSUME_INVENTORY_MANUAl, {
    onCompleted() {
      onConsumeInventory && onConsumeInventory();
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
      refetchPendingConsumption();
      Alert.success('the Inventory has been Transfered Successfully');
    },
    onError: err => {
      Alert.error(err.message);
    },
  });
  const [transferAction] = useMutation(TRANSFER_ACTION, {
    onCompleted({ transferAction: { accept } }) {
      onTransferInventory && onTransferInventory();
      refetchInventoryHistory();
      refetchInventory();
      refetchPendingConsumption();
      accept
        ? Alert.success('Ihe inventory item has been transferd Successfully')
        : Alert.error('The Inventory item has been rejected');
    },
    onError: err => {
      Alert.error(err.message);
    },
  });
  const [reconcilateSales] = useMutation(RECONCILATE_SALES, {
    onCompleted() {
      Alert.success('The reconsilation has been done Successfully');
      refetchInventoryHistory();
      refetchInventory();
      onReconsilate && onReconsilate();
    },
    refetchQueries: [
      {
        query: LIST_SALESES,
        variables: Object.assign(
          { offset: 0, limit: 20 },
          branchId && { branchId: branchId }
        ),
      },
    ],
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
            itemId: itemInventory.id,
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
      transferAction,
      reconcilateSales,
      inventoryPages,
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
      transferAction,
      reconcilateSales,
      inventoryPages,
    ]
  );
}

export default useInventory;
