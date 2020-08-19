import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import * as R from 'ramda';

import { MY_CLINICS } from '@/apollo-client/queries';
import useGlobalState from '@/state';

function useFetchClinics() {
  const [_, setClinic] = useGlobalState('currentClinic');
  const [isVerified] = useGlobalState('isVerified');
  const [getClinics, { data }] = useLazyQuery(MY_CLINICS);

  useEffect(() => {
    if (isVerified) {
      getClinics();
    }
    const clinics = R.prop('myClinics')(data);
    if (clinics) {
      setClinic(R.path(['0'])(clinics));
    }
  }, [data, getClinics, isVerified, setClinic]);
}

export default useFetchClinics;
