import Accounting from './accounting';
import Visa from './visa';
import Sales from './sales';
const init = app => {
  Accounting(app);
  Visa(app);
  Sales(app);
};

export default init;
