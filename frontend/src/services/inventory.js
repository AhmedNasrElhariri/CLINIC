import * as R from 'ramda';

import { UNIT_OF_MEASURES } from 'utils/constants';

export const getUnitOfMeasureShortCut = unitOfMeasure => {
  return R.pipe(
    R.find(R.propEq('value', unitOfMeasure)),
    R.prop('shortcut')
  )(UNIT_OF_MEASURES);
};
