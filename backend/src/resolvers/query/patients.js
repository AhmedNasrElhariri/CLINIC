import { prisma } from '@';
import { areas } from '@/services/areas';

const patients = async (
  _,
  { offset, limit, name, phoneNo, area, patientLevel },
  { organizationId }
) => {
  const theArea = area
    ? areas.find(a => a.city_name_ar === area || a.city_name_en === area)
    : '';

  const patientsCount = await prisma.patient.count({
    where: Object.assign(
      {
        organizationId,
        AND: [
          {
            OR: [
              {
                phoneNo: {
                  contains: phoneNo,
                },
              },
              {
                phoneNoTwo: {
                  contains: phoneNo,
                },
              },
            ],
          },
          {
            OR: [
              {
                code: {
                  contains: name,
                  mode: 'insensitive',
                },
              },
              {
                name: {
                  contains: name,
                  mode: 'insensitive',
                },
              },
            ],
          },
        ],
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
      }
    ),
  });
  const patients = await prisma.patient.findMany({
    where: Object.assign(
      {
        organizationId,
        AND: [
          {
            OR: [
              {
                phoneNo: {
                  contains: phoneNo,
                },
              },
              {
                phoneNoTwo: {
                  contains: phoneNo,
                },
              },
            ],
          },
          {
            OR: [
              {
                code: {
                  contains: name,
                  mode: 'insensitive',
                },
              },
              {
                name: {
                  contains: name,
                  mode: 'insensitive',
                },
              },
            ],
          },
        ],
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
      }
    ),
    skip: offset,
    take: limit,
  });
  const data = { patients: patients, patientsCount: patientsCount };
  return data;
};

export default patients;
