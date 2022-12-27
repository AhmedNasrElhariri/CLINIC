import { useMemo } from 'react';
import { LIST_EXPENSES, LIST_REVENUES } from 'apollo-client/queries';

import useGlobalState from 'state';

const useView = ({} = {}) => {
  const [views] = useGlobalState('activeViews');
  const userView = views.Session;

  return useMemo(
    () => ({
      userView,
      refetchRevenues: {
        query: LIST_REVENUES,
      },
      refetchExpenses: {
        query: LIST_EXPENSES,
      },
    }),
    [userView]
  );
};

export default useView;
