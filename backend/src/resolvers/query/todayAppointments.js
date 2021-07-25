import { prisma } from '@';
import * as R from 'ramda';
import moment from 'moment';
const appointments = async (_, { user, organizationId }) => {
  const from =moment(new Date()).startOf('day').toDate(); 
    // moment(new Date()).hours() >= 5 ? moment(new Date()) : moment(new Date()).subtract(1, 'days');

  // const from = refDate.set({
  //   hours: 6,
  //   minutes: 0,
  //   seconds: 0,
  //   milliseconds: 0,
  // }).toDate();
  // const to = moment(from).add(1, 'days').toDate();
  const to = moment(new Date()).endOf('day').toDate();
  console.log(from,to,'fromto mmmmmmmm'); 
  const appointments = await prisma.appointment.findMany({
    where: {
      date: {
        gte: from,
        lte: to,
      },
    },
    include: {
      specialty: true,
      branch: true,
      user: true,
      session: true,
      patient: true,
      doctor:true,
    },
  });
  return appointments;
};

export default appointments;
