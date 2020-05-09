import * as R from 'ramda';

export const convertGroupFieldsToNavs = groups => {
  return groups.map(g => ({
    ...g,
    title: g.name,
    to: g.id,
    fields: g.fields,
  }));
};

export const getFormLabelsAndNames = groups => {
  const fields = groups.map(group =>
    group.fields.map(({ id }) => [String(id), ''])
  );
  return R.unnest(fields);
};

export const getFormInitValues = groups => {
  return R.fromPairs(getFormLabelsAndNames(groups));
};
