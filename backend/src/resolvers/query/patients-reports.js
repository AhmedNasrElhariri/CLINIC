import { prisma } from '@';
import { areas } from '@/services/areas';
import moment from 'moment';
import { listFlattenUsersTreeIds } from '@/services/permission.service';
import { ACTIONS } from '@/utils/constants';
const isSameUser = (a, b) => a.value === b.value && a.display === b.display;
const onlyInLeft = (left, right, compareFunction) =>
  left.filter(
    leftValue =>
      !right.some(rightValue => compareFunction(leftValue, rightValue))
  );
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
    enable,
    ageFrom,
    ageTo,
    reference,
    branchId,
  },
  { organizationId, user }
) => {
  const ids = await listFlattenUsersTreeIds(
    {
      user,
      organizationId,
      action: ACTIONS.List_Appointment,
    },
    false
  );
  const theArea = area
    ? areas.find(a => a.city_name_ar === area || a.city_name_en === area)
    : '';
  const startDay = moment(dateFrom).startOf('day').toDate();
  const endDay = moment(dateTo).endOf('day').toDate();
  let data = {};
  if (enable) {
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
        ageFrom && {
          age: {
            gte: ageFrom,
            lte: ageTo,
          },
        },
        branchId && {
          branchId: branchId,
        }
      ),
    });
    const newPatients = reference
      ? patients.filter(p => p.reference.includes(reference))
      : patients;

    const apps = await prisma.appointment.findMany({
      where: Object.assign(
        {
          AND: [
            {
              OR: [
                {
                  doctorId: {
                    in: ids,
                  },
                },
                {
                  branchId: {
                    in: ids,
                  },
                },
                {
                  specialtyId: {
                    in: ids,
                  },
                },
              ],
            },
          ],
        },
        dateTo &&
          dateFrom && {
            date: {
              gte: startDay,
              lte: endDay,
            },
          }
      ),
      include: {
        patient: true,
      },
    });
    const updatedApps = apps.map(a => {
      return a.patient;
    });

    const uniquePatients = [...new Set(updatedApps.map(item => item.id))];

    const results = newPatients.filter(
      ({ id: id1 }) => !uniquePatients.some(id => id === id1)
    );

    const TO = offset + limit;
    const finalPatients = results.slice(offset, TO);
    const patientsCount = results.length;
    data = { patients: finalPatients, patientsCount: patientsCount };
  } else {
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
        },
        branchId && {
          branchId: branchId,
        }
      ),
    });
    const newPatients = reference
      ? patients.filter(p => p.reference.includes(reference))
      : patients;
    const TO = offset + limit;
    const finalPatients = newPatients.slice(offset, TO);
    const patientsCount = newPatients.length;
    data = { patients: finalPatients, patientsCount: patientsCount };
  }

  return data;
};

export default patients;
