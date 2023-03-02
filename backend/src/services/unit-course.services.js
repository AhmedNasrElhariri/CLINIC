import { prisma } from '@';
import {
  reduceServices,
  createUnitHistoryFormParts,
  changeServices,
} from '@/services/course-parts.services';
import { costServices } from '@/services/cost-of-doctor-course.services';
import { APIExceptcion } from '@/services/erros.service';

export const consumeUnits = async (
  parts,
  data,
  courseId,
  DOCTORID,
  organizationId,
  userId,
  finalConsumed,
  notes,
  courseDefinitionId,
  consumed
) => {
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
  } else {
    const condition =
      data.customUnits > 0
        ? consumed > data.customUnits - data.consumed
        : consumed > data.courseDefinition.units - data.consumed;
    if (condition) {
      throw new APIExceptcion('you have been exceed the units ');
    }
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
};
export const editUnis = async (
  parts,
  courseId,
  data,
  finalConsumed,
  courseDefinitionId
) => {
  if (parts && parts.length > 0) {
    const PARTSIDS = parts.map(p => p.id);
    const PARTS = await prisma.coursePart.findMany({
      where: { id: { in: PARTSIDS } },
      include: { part: true },
    });
    const sessions = PARTS.map(({ remainingUnits, id, totalUnits }) => {
      const amount = parts.find(p => p.id === id).amount;
      return {
        id,
        oldRemainingUnits: remainingUnits,
        oldTotalUnis: totalUnits,
        amount,
      };
    });
    await changeServices(sessions);
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
      },
      parts && parts.length > 0 && { customUnits: finalConsumed },
      courseDefinitionId && {
        courseDefinition: {
          connect: {
            id: data.courseDefinitionId,
          },
        },
        consumed: finalConsumed,
      }
    ),
  });
};
