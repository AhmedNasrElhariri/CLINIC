import { prisma } from '@';
import { consumeUnits, editUnis } from '@/services/unit-course.services';

const editCourseUnits = async (
  _,
  { courseId, consumed, type, notes, parts, doctorId: DOCTORID },
  { userId, organizationId }
) => {
  const finalConsumed =
    parts && parts.length > 0
      ? parts.reduce((sum, { amount }) => sum + amount, 0)
      : consumed;
  const data = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      patient: true,
      courseDefinition: true,
    },
  });

  const { courseDefinitionId } = data;
  if (type === 'addNewUnits') {
    return consumeUnits(
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
    );
  } else {
    return editUnis(parts, courseId, data, finalConsumed, courseDefinitionId);
  }
};

export default editCourseUnits;
