import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  ADD_PAYROLL_USER,
  LIST_PAY_ROLL_USERS,
  ADD_PAYROLL_TRANSACTION,
  LIST_USER_TRANSACTIONS,
} from 'apollo-client/queries';
import client from 'apollo-client/client';

// const updateCache = myPayRollUsers => {
//   client.writeQuery({
//     query: LIST_PAY_ROLL_USERS,
//     data: {
//         myPayRollUsers,
//     },
//   });
// };

function usePayRoll({ userId }) {
  const { data } = useQuery(LIST_PAY_ROLL_USERS);
  const payRollUsers = useMemo(() => R.propOr([], 'myPayRollUsers')(data), [
    data,
  ]);
  const { data: transactionData } = useQuery(LIST_USER_TRANSACTIONS, {
    variables: { userId },
  });
  const userTransactions = useMemo(
    () => R.propOr([], 'myUserTransactions')(transactionData),
    [transactionData]
  );
  const [addPayRollUser] = useMutation(ADD_PAYROLL_USER, {
    onCompleted() {
      Alert.success('the User has been Added Successfully');
    },
    // update(cache, { data: { addImageDefinition: imageDefinition } }) {
    //   updateCache([...imagesDefinition, imageDefinition]);
    // },
    onError() {
      Alert.error('Failed to add new User');
    },
  });

  const [addTransaction] = useMutation(ADD_PAYROLL_TRANSACTION, {
    onCompleted() {
      Alert.success('the User has been Added Successfully');
    },
    // update(cache, { data: { addImageDefinition: imageDefinition } }) {
    //   updateCache([...imagesDefinition, imageDefinition]);
    // },
    onError() {
      Alert.error('Failed to add new User');
    },
  });
  //   const [editImageDefinition] = useMutation(EDIT_IMAGE_DEFINITION, {
  //     onCompleted() {
  //       Alert.success('the Image has been Edited Successfully');
  //       onEdit && onEdit();
  //     },
  //     onError() {
  //       Alert.error('Failed to edit the Image');
  //     },
  //   });

  return useMemo(
    () => ({
      addPayRollUser,
      payRollUsers,
      addTransaction,
      userTransactions,
    }),
    [addPayRollUser, payRollUsers, addTransaction, userTransactions]
  );
}

export default usePayRoll;
