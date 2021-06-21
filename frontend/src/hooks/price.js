import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  ADD_PRICE,
  EDIT_PRICE,
  LIST_PRICES,
} from 'apollo-client/queries';
import client from 'apollo-client/client';

const updateCache = myPrices => {
  client.writeQuery({
    query: LIST_PRICES,
    data: {
      myPrices,
    },
  });
};

function usePrice({ onCreate, onEdit } = {}) {
  const { data } = useQuery(LIST_PRICES);
  const prices = useMemo(
    () => R.propOr([], 'myPrices')(data),
    [data]
  );

  const [addPrice] = useMutation(ADD_PRICE, {
    onCompleted() {
      Alert.success('the Price has been Added Successfully');
      onCreate && onCreate();
    },
    update(cache, { data: { addPrice: price } }) {
      updateCache([...prices, price]);
    },
    onError() {
      Alert.error('Failed to add new Price');
    },
  });
  const [editPrice] = useMutation(EDIT_PRICE, {
    onCompleted() {
      Alert.success('the PriceEdited Successfully');
      onEdit && onEdit();
    },
    onError() {
      Alert.error('Failed to edit the Price')}
  });

  return useMemo(
    () => ({
      prices,
      addPrice,
      editPrice,
      updateCache,
    }),
    [prices, addPrice, editPrice]
  );
}

export default usePrice;
