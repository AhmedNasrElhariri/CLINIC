import { prisma } from '@';
import CryptoJS from 'crypto-js';
const patient = async (_, { id }) => {
  const patient = await prisma.patient.findUnique({ where: { id } });
  const { name: name1, phoneNo: phone1, ...rest } = patient;
  const decryptedName = await CryptoJS.AES.decrypt(name1, 'secret key 123');
  const originalName = await decryptedName.toString(CryptoJS.enc.Utf8);
  const decryptedPhoneNo = await CryptoJS.AES.decrypt(phone1, 'secret key 123');
  const originalPhoneNo = await decryptedPhoneNo.toString(CryptoJS.enc.Utf8);
  const newPatient = {
    ...rest,
    name: originalName,
    phoneNo: originalPhoneNo,
  };
  return newPatient;
};

export default patient;
