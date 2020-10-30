import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';

import {
  CREATE_ITEM,
  ADD_ITEM,
  LIST_ITEMS,
  LIST_INVENTORY,
  LIST_INVENTORY_HISTORY,
} from 'apollo-client/queries';
import useGlobalState from '../state';
import useFetchAccountingData from 'components/accounting/accounting-container/fetch-data';

export function useVariables() {
  const [clinic] = useGlobalState('currentClinic');
  if (!clinic) {
    return {};
  }
  return {
    clinicId: clinic.id,
  };
}

function useFetchInventory({ onCreateCompleted, onAddCompleted } = {}) {
  const { refetchExpenses } = useFetchAccountingData();
  const [clinic] = useGlobalState('currentClinic');
  const variables = useVariables();

  const { data: ItemData } = useQuery(LIST_ITEMS);
  const { data: InventoryData } = useQuery(LIST_INVENTORY, {
    variables,
  });
  const { data: InventoryHistoryData } = useQuery(LIST_INVENTORY_HISTORY, {
    variables,
  });

  const items = useMemo(() => R.propOr([], 'items')(ItemData), [ItemData]);
  const inventory = useMemo(() => R.propOr([], 'inventory')(InventoryData), [
    InventoryData,
  ]);
  const history = useMemo(
    () => R.propOr([], 'inventoryHistory')(InventoryHistoryData),
    [InventoryHistoryData]
  );

  const refetchInventoryHistory = useMemo(
    () => ({
      query: LIST_INVENTORY_HISTORY,
      variables,
    }),
    [variables]
  );

  const refetchInventory = useMemo(
    () => ({
      query: LIST_INVENTORY,
      variables,
    }),
    [variables]
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
            item,
          };
        }),
    [inventory, items]
  );

  const [create] = useMutation(CREATE_ITEM, {
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

  const [addItem] = useMutation(ADD_ITEM, {
    onCompleted: ({ addItem }) => {
      onAddCompleted && onAddCompleted(addItem);
    },
    refetchQueries: [
      refetchExpenses,
      refetchInventoryHistory,
      refetchInventory,
    ],
    update(
      cache,
      {
        data: {
          addItem: { itemId, quantity },
        },
      }
    ) {
      const { inventory } = cache.readQuery({
        query: LIST_INVENTORY,
        variables,
      });
      cache.writeQuery({
        query: LIST_INVENTORY,
        variables,
        data: {
          inventory: inventory.map(i =>
            Object.assign({}, i, i.itemId === itemId && { quantity })
          ),
        },
      });
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
            clinicId: clinic.id,
          },
        }),
      items,
      inventoryWithAmount,
      history,
      refetchInventory,
      refetchInventoryHistory,
    }),
    [
      addItem,
      clinic,
      create,
      history,
      inventoryWithAmount,
      items,
      refetchInventory,
      refetchInventoryHistory,
    ]
  );
}

export default useFetchInventory;
