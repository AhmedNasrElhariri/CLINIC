import * as R from 'ramda';

export const isValidNumber = R.both(R.is(Number), R.complement(R.equals(NaN)));

export const isFloat = val => {
  const floatRegex = /^-?\d+(?:[.,]\d*?)?$/;
  if (!floatRegex.test(val)) return false;

  const parsedVal = parseFloat(val);
  if (isNaN(parsedVal)) return false;
  return true;
};

export const formatNumber = num => {
  if (num === null || num === undefined) {
    return '';
  }
  const parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

export const unmask = str => {
  return (str || '').replace(/,/g, '');
};
