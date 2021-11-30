import { prisma } from '@';
import CryptoJS from 'crypto-js';
const patients = async (_, { name }, { user, organizationId }) => {
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
  const filteredPatients = updatedPatients.filter(
    p =>
      p.name.toLowerCase().includes(name.toLowerCase()) ||
      p.phoneNo.includes(name)
  );

  // const patients = await prisma.patient.findMany({
  //   where: {
  //     organizationId,
  //     OR: [
  //       {
  //         name: {
  //           contains: name,
  //           mode: 'insensitive',
  //         },
  //       },
  //       {
  //         phoneNo: {
  //           contains: name,
  //         },
  //       },
  //     ],
  //   },
  // });
  return filteredPatients;
};

export default patients;
