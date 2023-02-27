import { prisma } from '@';
import {
  reduceServices,
  createUnitHistoryFormParts,
} from '@/services/course-parts.services';
import { costServices } from '@/services/cost-of-doctor-course.services';
import { APIExceptcion } from '@/services/erros.service';

const editCourseUnits = async (
  _,
  { courseId, consumed, type, notes, parts, doctorId: DOCTORID },
  { userId, organizationId }
) => {
  const finalConsumed =
    consumed > 0
      ? consumed
      : parts.reduce((sum, { amount }) => sum + amount, 0);
  const data = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      patient: true,
      courseDefinition: true,
    },
  });
  const condition =
    data.customUnits > 0
      ? consumed > data.customUnits - data.consumed
      : consumed > data.courseDefinition.units - data.consumed;
  if (condition) {
    throw new APIExceptcion('you have been exceed the units ');
  }
  if (parts && parts.length > 0) {
    const PARTSIDS = parts.map(p => p.id);
    const PARTS = await prisma.coursePart.findMany({
      where: { id: { in: PARTSIDS } },
      include: { part: true },
    });
    const sessions = PARTS.map(({ unitPrice, partId, part, id }) => {
      const number = parts.find(p => p.id === id).amount;
      const notes = parts.find(p => p.id === id).notes;
      return {
        name: part.name,
        number: number,
        notes: notes,
        price: unitPrice,
        partID: partId,
      };
    });
    const cName = data.customName;
    const doctorId = DOCTORID == null ? data.doctorId : DOCTORID;
    await reduceServices(parts, courseId);
    await costServices(userId, sessions, organizationId, doctorId, cName);
    await createUnitHistoryFormParts(sessions, userId, doctorId, courseId);
  }
  const { courseDefinitionId } = data;
  if (type === 'addNewUnits') {
    if (consumed > 0) {
      await prisma.courseUnitsHistory.create({
        data: {
          user: {
            connect: {
              id: data.userId,
            },
          },
          doctor: {
            connect: {
              id: data.doctorId,
            },
          },
          course: {
            connect: {
              id: courseId,
            },
          },
          units: finalConsumed,
          notes: notes,
          date: new Date(),
        },
      });
    }
    return prisma.course.update({
      where: {
        id: courseId,
      },
      data: Object.assign(
        {
          patient: {
            connect: {
              id: data.patientId,
            },
          },
          user: {
            connect: {
              id: data.userId,
            },
          },
          doctor: {
            connect: {
              id: data.doctorId,
            },
          },
          consumed: data.consumed + finalConsumed,
        },
        courseDefinitionId && {
          courseDefinition: {
            connect: {
              id: courseDefinitionId,
            },
          },
        }
      ),
    });
  } else {
    return prisma.course.update({
      where: {
        id: courseId,
      },
      data: Object.assign(
        {
          patient: {
            connect: {
              id: data.patientId,
            },
          },
          user: {
            connect: {
              id: data.userId,
            },
          },
          doctor: {
            connect: {
              id: data.doctorId,
            },
          },
          consumed: finalConsumed,
        },
        courseDefinitionId && {
          courseDefinition: {
            connect: {
              id: data.courseDefinitionId,
            },
          },
        }
      ),
    });
  }
};

export default editCourseUnits;
