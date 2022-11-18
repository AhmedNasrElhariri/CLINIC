import * as R from 'ramda';

export const isValidNumber = R.both(R.is(Number), R.complement(R.equals(NaN)));

export const isFloat = val => {
  const floatRegex = /^-?\d+(?:[.,]\d*?)?$/;
  if (!floatRegex.test(val)) return false;

  const parsedVal = parseFloat(val);
  if (isNaN(parsedVal)) return false;
  return true;
};
