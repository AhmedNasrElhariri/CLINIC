import { prisma } from '@';
import { areas } from '@/services/areas';

const patients = async (
  _,
  { offset, limit, name, phoneNo, area },
  { organizationId }
) => {
  const theArea = areas.find(
    a => a.city_name_ar === area || a.city_name_en === area
  );

  const patientsCount = await prisma.patient.count({
    where: Object.assign(
      {
        organizationId,
        OR: [
          {
            name: {
              contains: name,
              mode: 'insensitive',
            },
          },
          {
            code: {
              contains: name,
              mode: 'insensitive',
            },
          },
        ],
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
      }
    ),
    skip: offset,
    take: limit,
  });
  const data = { patients: patients, patientsCount: patientsCount };
  return data;
};

export default patients;
