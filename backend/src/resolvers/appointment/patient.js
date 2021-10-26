import { prisma } from '@';
import CryptoJS from 'crypto-js';
const patient = async ({ id }) => {
  const patient = await prisma.appointment
    .findUnique({ where: { id } })
    .patient();
  const { name, phoneNo, ...rest } = patient;
  const decryptedName = await CryptoJS.AES.decrypt(name, 'secret key 123');
  const originalName = decryptedName.toString(CryptoJS.enc.Utf8);
  const decryptedPhoneNo = await CryptoJS.AES.decrypt(
    phoneNo,
    'secret key 123'
  );
  const originalPhoneNo = decryptedPhoneNo.toString(CryptoJS.enc.Utf8);
  const newPatient = {
    ...rest,
    name: originalName,
    phoneNo: originalPhoneNo,
  };
  return newPatient;
};

export default patient;
