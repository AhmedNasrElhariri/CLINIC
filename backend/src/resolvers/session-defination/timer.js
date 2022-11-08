import moment from 'moment';
import { getStartOfDay } from '@/services/date.service';
const timer = ({ timer, followUp }) => {
  const today = getStartOfDay(new Date());
  return moment(today).add(timer, 'days').toDate();
  
};

export default timer;
