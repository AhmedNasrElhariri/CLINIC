import { prisma } from '@';
import CryptoJS from 'crypto-js';
const patient = async ({ id }) => {
  const patient = await prisma.course.findUnique({ where: { id } }).patient();
  const { name: name1, phoneNo: phone1, ...rest } = patient;
  const decryptedName = CryptoJS.AES.decrypt(name1, 'secret key 123');
  const originalName = decryptedName.toString(CryptoJS.enc.Utf8);
  const decryptedPhoneNo = CryptoJS.AES.decrypt(phone1, 'secret key 123');
  const originalPhoneNo = decryptedPhoneNo.toString(CryptoJS.enc.Utf8);
  const updatedPatient = {
    ...rest,
    name: originalName,
    phoneNo: originalPhoneNo,
  };
  return updatedPatient;
};

export default patient;
