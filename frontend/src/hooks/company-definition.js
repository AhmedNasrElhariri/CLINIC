import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  ADD_COMPANY_DEFINITION,
  EDIT_COMPANY_DEFINITION,
  LIST_COMPANYS_DEFINITION,
} from 'apollo-client/queries';
import client from 'apollo-client/client';

const updateCache = myCompanysDefinition => {
  client.writeQuery({
    query: LIST_COMPANYS_DEFINITION,
    data: {
      myCompanysDefinition,
    },
  });
};

function useCompanyDefinition({ onCreate, onEdit } = {}) {
  const { data } = useQuery(LIST_COMPANYS_DEFINITION);
  const companysDefinition = useMemo(
    () => R.propOr([], 'myCompanysDefinition')(data),
    [data]
  );

  const [addCompanyDefinition, { loading }] = useMutation(
    ADD_COMPANY_DEFINITION,
    {
      onCompleted() {
        Alert.success('the Company has been Added Successfully');
        onCreate && onCreate();
      },
      update(cache, { data: { addCompanyDefinition: companyDefinition } }) {
        updateCache([...companysDefinition, companyDefinition]);
      },
      onError() {
        Alert.error('Failed to add new Company');
      },
    }
  );
  const [editCompanyDefinition] = useMutation(EDIT_COMPANY_DEFINITION, {
    onCompleted() {
      Alert.success('the Company has been Edited Successfully');
      onEdit && onEdit();
    },
    onError() {
      Alert.error('Failed to edit the Company');
    },
  });

  return useMemo(
    () => ({
      companysDefinition,
      addCompanyDefinition,
      editCompanyDefinition,
      updateCache,
      loading,
    }),
    [companysDefinition, addCompanyDefinition, editCompanyDefinition, loading]
  );
}

export default useCompanyDefinition;
