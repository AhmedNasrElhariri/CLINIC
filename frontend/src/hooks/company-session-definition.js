import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  ADD_COMPANY_SESSION_DEFINITION,
  EDIT_COMPANY_SESSION_DEFINITION,
  LIST_COMPANYS_SESSION_DEFINITION,
} from 'apollo-client/queries';
import client from 'apollo-client/client';

const updateCache = myCompanysSessionDefinition => {
  client.writeQuery({
    query: LIST_COMPANYS_SESSION_DEFINITION,
    data: {
      myCompanysSessionDefinition,
    },
  });
};

function useCompanySessionDefinition({ onCreate, onEdit } = {}) {
  const { data } = useQuery(LIST_COMPANYS_SESSION_DEFINITION);
  const companysSessionDefinition = useMemo(
    () => R.propOr([], 'myCompanysSessionDefinition')(data),
    [data]
  );

  const [addCompanySessionDefinition, { loading }] = useMutation(
    ADD_COMPANY_SESSION_DEFINITION,
    {
      onCompleted() {
        Alert.success('the Company Session has been Added Successfully');
        onCreate && onCreate();
      },
      update(
        cache,
        { data: { addCompanySessionDefinition: companySessionDefinition } }
      ) {
        updateCache([...companysSessionDefinition, companySessionDefinition]);
      },
      onError() {
        Alert.error('Failed to add new Company Session');
      },
    }
  );
  const [editCompanySessionDefinition] = useMutation(
    EDIT_COMPANY_SESSION_DEFINITION,
    {
      onCompleted() {
        Alert.success('the Company Session has been Edited Successfully');
        onEdit && onEdit();
      },
      onError() {
        Alert.error('Failed to edit the Company Session');
      },
    }
  );

  return useMemo(
    () => ({
      companysSessionDefinition,
      addCompanySessionDefinition,
      editCompanySessionDefinition,
      updateCache,
      loading,
    }),
    [
      companysSessionDefinition,
      addCompanySessionDefinition,
      editCompanySessionDefinition,
      loading,
    ]
  );
}

export default useCompanySessionDefinition;
