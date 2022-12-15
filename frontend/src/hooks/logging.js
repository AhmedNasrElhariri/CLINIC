import React, { useMemo } from 'react';
import * as R from 'ramda';
import { useQuery } from '@apollo/client';
import { LIST_LOGGING, LIST_LOGGING_TAG } from 'apollo-client/queries';

const Logging = ({ page, dateFrom, dateTo, userId, model, tagName }) => {
  const { data } = useQuery(LIST_LOGGING, {
    variables: Object.assign(
      {
        offset: (page - 1) * 20 || 0,
        limit: 20,
      },
      dateFrom && { dateFrom },
      dateTo && { dateTo },
      userId && { userId },
      model && { model },
      tagName && { tagName }
    ),
  });
  const { data: loggingTagData } = useQuery(LIST_LOGGING_TAG);
  const loggingsdata = data?.logging;
  const loggingCount = R.propOr(0, 'loggingCount')(loggingsdata);
  const pages = Math.ceil(loggingCount / 20);

  const loggings = useMemo(() => R.propOr(0, 'logging')(loggingsdata), [data]);
   console.log(loggingTagData,'loggingTagDataloggingTagData')
  const loggingTags = useMemo(
    () => R.propOr([], 'loggingTags')(loggingTagData),
    [loggingTagData]
  );
  const models = useMemo(() => {
    const unique = [...new Set(loggingTags.map(item => item.model))];
    return unique.map(u => {
      return { id: u, name: u };
    });
  }, [loggingTags]);
  const tagNames = useMemo(
    () => (model ? loggingTags.filter(lg => lg.model === model) : []),
    [model, loggingTags]
  );
  return useMemo(
    () => ({ pages, loggings, loggingCount, models, tagNames }),
    [pages, loggings, loggingCount, models, tagNames]
  );
};

export default Logging;
