import * as R from 'ramda';

export const isValidNumber = R.both(R.is(Number), R.complement(R.equals(NaN)));
