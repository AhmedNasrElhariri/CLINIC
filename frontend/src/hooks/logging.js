import React, { useMemo } from 'react';
import * as R from 'ramda';
import { useQuery } from '@apollo/client';
import { LIST_LOGGING } from 'apollo-client/queries';

const Logging = ({ page, dateFrom, dateTo, userId }) => {
  const { data } = useQuery(LIST_LOGGING, {
    variables: Object.assign(
      {
        offset: (page - 1) * 20 || 0,
        limit: 20,
      },
      dateFrom && { dateFrom },
      dateTo && { dateTo },
      userId && { userId }
    ),
  });
  const loggingsdata = data?.logging;
  const loggingCount = R.propOr(0, 'loggingCount')(loggingsdata);
  const pages = Math.ceil(loggingCount / 20);
  
  const loggings = useMemo(() => {
    return R.propOr(0, 'logging')(loggingsdata);
  }, [data]);
  return useMemo(
    () => ({ pages, loggings, loggingCount }),
    [pages, loggings, loggingCount]
  );
};

export default Logging;
