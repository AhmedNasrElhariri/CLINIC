import { prisma } from '@';
import axios from 'axios';

const generateRandomNumber = () => {
  let minm = 100000;
  let maxm = 999999;
  return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
};
const sendOtp = async (_, { phoneNo }) => {
  const randomOtp = generateRandomNumber();
  const otpTransaction = await prisma.patientOtp.findMany({
    where: {
      phoneNo: {
        contains: phoneNo,
      },
    },
  });
  const trans = otpTransaction[0];
  if (otpTransaction.length > 0) {
    await prisma.patientOtp.update({
      data: {
        otp: randomOtp,
      },
      where: {
        id: trans.id,
      },
    });
  } else {
    await prisma.patientOtp.create({
      data: {
        phoneNo,
        status: 'Pending',
        otp: randomOtp,
      },
    });
  }
  const originalMessage = 'your OTP is ' + randomOtp;
  const YourSenderID = 'SEEM';
  const YourPassword = '77JKaw\\CpJZY]}8y';
  const YourUserName = 'seem';

  const URL = `http://www.mysmslogin.com/sendsms.aspx?u=${YourUserName.valueOf()}&p=${YourPassword.valueOf()}&sndr=${YourSenderID.valueOf()}&to=${phoneNo.valueOf()}&msg=${originalMessage.valueOf()}`;
  axios({
    method: 'get',
    url: URL,
  })
    .then(res => (res, 'rrr'))
    .catch(err => (err, 'ER'));
  return randomOtp;
};

export default sendOtp;
