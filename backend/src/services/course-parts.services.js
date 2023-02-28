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
  sessions.forEach(({ id, amount: number }) => {
    const part = courseParts.find(s => s.id === id);
    const TOTALREMAININGUNITS = part.remainingUnits - number;
    if (TOTALREMAININGUNITS < 0) {
      throw new APIExceptcion(`you finished this part - ${part.part.name}`);
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
  return sessions.map(({ number, notes }) => {
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
        notes,
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

export const reduceServices = async (sessions, courseId) => {
  const courseParts = await prisma.coursePart.findMany({
    where: { courseId: courseId },
    include: { part: true },
  });
  sessions.length > 0 &&
    (await updateCoursePartModel(
      createReduceeFromCourseParts(sessions, courseParts)
    ));
};
export const createUnitHistoryFormParts = async (
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
