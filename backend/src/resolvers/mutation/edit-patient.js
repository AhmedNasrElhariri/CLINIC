import { prisma } from '@';
import CryptoJS from 'crypto-js';


const editPatient = async (_, { patient }, { userId, organizationId }) => {
  const { id, name, phoneNo, age, sex } = patient;
  const orgPatients = await prisma.patient.findMany({
    where: {
      organizationId,
    },
  });
  const updatedPatients = orgPatients.map(p => {
    const { name: name1, phoneNo: phone1, ...rest } = p;
    const decryptedName = CryptoJS.AES.decrypt(name1, 'secret key 123');
    const originalName = decryptedName.toString(CryptoJS.enc.Utf8);
    const decryptedPhoneNo = CryptoJS.AES.decrypt(phone1, 'secret key 123');
    const originalPhoneNo = decryptedPhoneNo.toString(CryptoJS.enc.Utf8);
    return {
      ...rest,
      name: originalName,
      phoneNo: originalPhoneNo,
    };
  });
  const cryptedName = await CryptoJS.AES.encrypt(
    name,
    'secret key 123'
  ).toString();
  const cryptedPhoneNo = await CryptoJS.AES.encrypt(
    phoneNo,
    'secret key 123'
  ).toString();

  const returnedPatient = await prisma.patient.update({
    data: {
      name: cryptedName,
      phoneNo: cryptedPhoneNo,
      age: age,
      sex: sex,
      organization: {
        connect: {
          id: organizationId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
    where: {
      id,
    },
  });
  const { name: name1, phoneNo: phone1, ...p } = returnedPatient;
  return { ...p, name: name, phoneNo: phoneNo };
};

export default editPatient;
