import { prisma } from '@';
import { APIExceptcion } from './erros.service';

export const getClinicDoctoryByUserId = async clinicId => {
  const doctors = await prisma.user.findMany({
    where: {
      position: 'Doctor',
      clinics: {
        some: {
          id: clinicId,
        },
      },
    },
    take: 1,
  });
  if (!doctors.length) {
    throw APIExceptcion('Select Doctor');
  }
  return doctors[0];
};
