import initAccounting from './accounting';
import initVisa from './visa';
import initSales from './sales';
import initInsurance from './insurance';
import initDoctorFees from './doctor-fees';
import initAllAccounting from './all-accounting';
import initSessionReports from './session-reports';
import initTodayAppointment from './today-appointment';

const init = app => {
  initAccounting(app);
  initVisa(app);
  initSales(app);
  initInsurance(app);
  initDoctorFees(app);
  initAllAccounting(app);
  initSessionReports(app);
  initTodayAppointment(app);
};

export default init;
