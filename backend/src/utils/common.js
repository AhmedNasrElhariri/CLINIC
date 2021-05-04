export const normalizeArray = (arr = [], prop = 'id') => {
  return arr.reduce(
    (acc, item) => ({
      ...acc,
      [item[prop]]: item,
    }),
    {}
  );
};
