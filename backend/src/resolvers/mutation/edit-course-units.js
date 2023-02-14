import { prisma } from '@';
import { reduceServices } from '@/services/course-parts.services';
import { costServices } from '@/services/cost-of-doctor-course.services';

const editCourseUnits = async (
  _,
  { courseId, consumed, type, notes, parts },
  { userId, organizationId }
) => {
  const finalConsumed =
    consumed > 0
      ? consumed
      : parts.reduce((sum, { number }) => sum + number, 0);
  const data = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      patient: true,
    },
  });
  if (parts && parts.length > 0) {
    const PARTSIDS = parts.map(p => p.id);
    const PARTS = await prisma.coursePart.findMany({
      where: { id: { in: PARTSIDS } },
      include: { part: true },
    });
    const sessions = PARTS.map(({ unitPrice, partId, part, id }) => {
      const number = parts.find(p => p.id === id).number;
      return {
        name: part.name,
        number: number,
        price: unitPrice,
        partID: partId,
      };
    });
    const cName = data.customName;
    const doctorId = data.doctorId;
    await reduceServices(parts, courseId);
    await costServices(userId, sessions, organizationId, doctorId, cName);
  }
  const { courseDefinitionId } = data;
  if (type === 'addNewUnits') {
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
