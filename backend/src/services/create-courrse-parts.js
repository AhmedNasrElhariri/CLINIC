import { prisma } from '@';

export const createCourseParts = async data => {
  return Promise.all(data.map(d => prisma.coursePart.create({ data: d })));
};
export const createCoursePartsFromCourse = (
  parts,
  courseId,
  organizationId
) => {
  return parts.map(({ number, price, id, extraUnits }) =>
    Object.assign({
      totalUnits: number + extraUnits,
      remainingUnits: number + extraUnits,
      unitPrice: price,
      organizationId,
      courseId,
      partId: id,
    })
  );
};
