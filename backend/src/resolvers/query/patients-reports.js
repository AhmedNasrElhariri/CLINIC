import { prisma } from '@';
import { areas } from '@/services/areas';
import moment from 'moment';

const patients = async (
  _,
  {
    offset,
    limit,
    area,
    patientLevel,
    type,
    dateFrom,
    dateTo,
    ageFrom,
    ageTo,
    reference,
  },
  { organizationId }
) => {
  const theArea = area
    ? areas.find(a => a.city_name_ar === area || a.city_name_en === area)
    : '';
  const startDay = moment(dateFrom).startOf('day').toDate();
  const endDay = moment(dateTo).endOf('day').toDate();
  const patients = await prisma.patient.findMany({
    where: Object.assign(
      {
        organizationId,
      },
      theArea && {
        OR: [
          {
            area: {
              contains: theArea.city_name_en,
            },
          },
          {
            area: {
              contains: theArea.city_name_ar,
            },
          },
        ],
      },
      patientLevel && {
        patientLevel: patientLevel,
      },
      type && {
        sex: type,
      },
      dateFrom && {
        createdAt: {
          gte: startDay,
          lte: endDay,
        },
      },
      ageFrom && {
        age: {
          gte: ageFrom,
          lte: ageTo,
        },
      }
    ),
  });
  const newPatients = reference
    ? patients.filter(p => p.reference.includes(reference))
    : patients;
  const TO = offset + limit;
  const finalPatients = newPatients.slice(offset, TO);
  const patientsCount = newPatients.length;
  const data = { patients: finalPatients, patientsCount: patientsCount };
  return data;
};

export default patients;
