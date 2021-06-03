import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  ADD_BANK_DEFINITION,
  EDIT_BANK_DEFINITION,
  LIST_BANKS_DEFINITION,
} from 'apollo-client/queries';
import client from 'apollo-client/client';

const updateCache = myBanksDefinition => {
  client.writeQuery({
    query: LIST_BANKS_DEFINITION,
    data: {
      myBanksDefinition,
    },
  });
};

function useBankDefinition({ onCreate, onEdit } = {}) {
  const { data } = useQuery(LIST_BANKS_DEFINITION);
  const banksDefinition = useMemo(
    () => R.propOr([], 'myBanksDefinition')(data),
    [data]
  );

  const [addBankDefinition] = useMutation(ADD_BANK_DEFINITION, {
    onCompleted() {
      Alert.success('the Bank has been Added Successfully');
      onCreate && onCreate();
    },
    update(cache, { data: { addBankDefinition: bankDefinition } }) {
      updateCache([...banksDefinition, bankDefinition]);
    },
    onError() {
      Alert.error('Failed to add new Bank');
    },
  });
  const [editBankDefinition] = useMutation(EDIT_BANK_DEFINITION, {
    onCompleted() {
      Alert.success('the Bank has been Edited Successfully');
      onEdit && onEdit();
    },
    onError() {
      Alert.error('Failed to edit the Bank');
    },
  });

  return useMemo(
    () => ({
      banksDefinition,
      addBankDefinition,
      editBankDefinition,
      updateCache,
    }),
    [banksDefinition, addBankDefinition, editBankDefinition]
  );
}

export default useBankDefinition;
