import CryptoJS from 'crypto-js';
import { prisma } from '@';
export const decryptedPatients = async ({ organizationId }) => {
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
  return updatedPatients;
};
