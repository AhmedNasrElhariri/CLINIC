import { prisma } from '@';
import CryptoJS from 'crypto-js';
import { getArea } from '../../services/get_Area';
const comparing = (phone, patients) => {
  let exist = false;
  patients.forEach(p => {
    if (p.phoneNo === phone) {
      exist = true;
    }
  });
  return exist;
};
const createPatient = async (
  _,
  { input: patient },
  { userId, organizationId }
) => {
  const { area, code, name, phoneNo, ...rest } = patient;
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
  const compare = comparing(phoneNo, updatedPatients);
  if (compare) {
    throw new Error('Phone No is existed');
  }

  const organization = await prisma.organization.findUnique({
    where: {
      id: organizationId,
    },
  });

  const { patientCode, id } = organization;
  await prisma.organization.update({
    data: {
      patientCode: patientCode + 1,
    },
    where: {
      id,
    },
  });
  const areaName = area ? getArea(area) : '';
  const cryptedName = await CryptoJS.AES.encrypt(
    name,
    'secret key 123'
  ).toString();
  const cryptedPhoneNo = await CryptoJS.AES.encrypt(
    phoneNo,
    'secret key 123'
  ).toString();

  const returnedPatient = await prisma.patient.create({
    data: {
      area: areaName,
      code: 'cr' + patientCode,
      name: cryptedName,
      phoneNo: cryptedPhoneNo,
      ...rest,
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
  });
  const { name: name1, phoneNo: phone1, ...p } = returnedPatient;
  return { ...p, name: name, phoneNo: phoneNo };
};

export default createPatient;
