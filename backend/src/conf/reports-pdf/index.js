import initAccounting from './accounting';
import initVisa from './visa';
import initSales from './sales';
import initInsurance from './insurance';

const init = app => {
  initAccounting(app);
  initVisa(app);
  initSales(app);
  initInsurance(app);
};

export default init;
