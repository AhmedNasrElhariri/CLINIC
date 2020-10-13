import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import * as R from 'ramda';

import useUserInfo from '@/hooks/fetch-user-info';

const initalFilter = {
  types: [],
  clinics: [],
};

const types = ['Examination', 'Followup', 'Session', 'Urgent'];

const useFilter = appointments => {
  const { clinics } = useUserInfo();
  const [filter, setfilter] = useState(initalFilter);
  const alreadySet = useRef(false);

  useEffect(() => {
    if (!filter.clinics.length && clinics.length && !alreadySet.current) {
      alreadySet.current = true;
      setfilter({ ...filter, clinics: clinics.map(c => c.name) });
    }
  }, [clinics, filter]);

  useEffect(() => {
    setfilter({ ...filter, types });
  }, []);

  const onSwitch = useCallback(
    filterEntity => value => {
      const currentFilter = filter[filterEntity];
      const newFilter = currentFilter.includes(value)
        ? R.without([value])(currentFilter)
        : currentFilter.concat([value]);
      setfilter({ ...filter, [filterEntity]: newFilter });
    },
    [filter]
  );

  const onSwitchAll = useCallback(
    (filterProp, entites) => () => {
      const currentFilter = filter[filterProp];
      const newFilter = currentFilter.length === entites.length ? [] : entites;
      setfilter({ ...filter, [filterProp]: newFilter });
    },
    [filter]
  );

  const clinicsNames = useMemo(() => clinics.map(c => c.name), [clinics]);

  // const filterAppointments = useCallback(() => {
  //   const { types, clinics } = filter;
  //   return appointments.filter(
  //     app => types.includes(app.type) && clinics.includes(app.clinic.name)
  //   );
  // }, [appointments, filter]);
  const filteredAppointments = useMemo(() => {
    const { types, clinics } = filter;
    return appointments.filter(
      app => types.includes(app.type) && clinics.includes(app.clinic.name)
    );
  }, [appointments, filter]);

  return useMemo(
    () => ({
      filter,
      onSwitch,
      onSwitchAll,
      clinicsNames,
      types,
      filteredAppointments,
    }),
    [filter, onSwitch, onSwitchAll, clinicsNames, filteredAppointments]
  );
};

export default useFilter;
