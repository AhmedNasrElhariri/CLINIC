import { prisma } from '@';
import { data } from '@/resolvers/appointment';
import { APIExceptcion } from './erros.service';

const updateCoursePartModel = async data => {
  return Promise.all(data.map(d => prisma.coursePart.update({ ...d })));
};
const createUnitsHistoryFromSessions = data => {
  return Promise.all(data.map(d => prisma.courseUnitsHistory.create(d)));
};
const createPaymentHistoryFromSessions = data => {
  return Promise.all(data.map(d => prisma.coursePayment.create(d)));
};
const createReduceeFromCourseParts = (sessions, courseParts) => {
  let newParts = [];

  sessions.forEach(({ id, number, name }) => {
    const part = courseParts.find(s => s.id === id);
    const TOTALREMAININGUNITS = part.remainingUnits - number;
    if (TOTALREMAININGUNITS < 0) {
      throw new APIExceptcion(`you finished this part - ${name}`);
    }
    const partDef = {
      data: {
        remainingUnits: TOTALREMAININGUNITS,
      },
      where: {
        id: id,
      },
    };
    newParts.push(partDef);
  });
  return newParts;
};
const createUnitHistor = (sessions, userId, doctorId, courseId) => {
  return sessions.map(({ number, name }) => {
    return {
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        doctor: {
          connect: {
            id: doctorId,
          },
        },
        course: {
          connect: {
            id: courseId,
          },
        },
        units: number,
        notes: `from part ${name}`,
        date: new Date(),
      },
    };
  });
};
const createPaymentHistory = (
  sessions,
  userId,
  doctorId,
  courseId,
  specialtyId,
  branchId
) => {
  return sessions.map(({ number, price }) => {
    return {
      data: Object.assign(
        {
          payment: number * price,
          date: new Date(),
          user: {
            connect: {
              id: userId,
            },
          },
          course: {
            connect: {
              id: courseId,
            },
          },
        },
        specialtyId && {
          specialty: {
            connect: {
              id: specialtyId,
            },
          },
        },
        branchId && {
          branch: {
            connect: {
              id: branchId,
            },
          },
        },
        doctorId && {
          doctor: {
            connect: {
              id: doctorId,
            },
          },
        }
      ),
    };
  });
};

export const ReduceServices = async (sessions, courseId) => {
  const courseParts = await prisma.coursePart.findMany({
    where: { courseId: courseId },
  });
  sessions.length > 0 &&
    (await updateCoursePartModel(
      createReduceeFromCourseParts(sessions, courseParts)
    ));
};
export const CreateUnitHistoryFormParts = async (
  sessions,
  userId,
  doctorId,
  courseId
) => {
  await createUnitsHistoryFromSessions(
    createUnitHistor(sessions, userId, doctorId, courseId)
  );
};
export const CreatePaymentFormParts = async (
  sessions,
  userId,
  doctorId,
  courseId,
  specialtyId,
  branchId
) => {
  await createPaymentHistoryFromSessions(
    createPaymentHistory(
      sessions,
      userId,
      doctorId,
      courseId,
      specialtyId,
      branchId
    )
  );
};
