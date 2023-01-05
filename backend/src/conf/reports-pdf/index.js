import initAccounting from './accounting';
import initVisa from './visa';
import initSales from './sales';
import initInsurance from './insurance';
import initDoctorFees from './doctor-fees';

const init = app => {
  initAccounting(app);
  initVisa(app);
  initSales(app);
  initInsurance(app);
  initDoctorFees(app);
};

export default init;
