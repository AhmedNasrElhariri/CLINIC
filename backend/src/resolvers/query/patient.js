import { prisma } from '@';
const patient = async (_, { id }) => {
  const patient = await prisma.patient.findUnique({ where: { id } });
  const { name: name1, phoneNo: phone1, ...rest } = patient;
  const decryptedName = await CryptoJS.AES.decrypt(name1, 'secret key 123');
  const originalName = decryptedName.toString(CryptoJS.enc.Utf8);
  const decryptedPhoneNo = await CryptoJS.AES.decrypt(phone1, 'secret key 123');
  const originalPhoneNo = decryptedPhoneNo.toString(CryptoJS.enc.Utf8);
  const updatedPatient = {
    ...rest,
    name: originalName,
    phoneNo: originalPhoneNo,
  };
  return updatedPatient;
};

export default patient;
