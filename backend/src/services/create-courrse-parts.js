import { prisma } from '@';

export const createCourseParts = async data => {
  return Promise.all(data.map(d => prisma.coursePart.create({ data: d })));
};
export const createCoursePartsFromCourse = (
  parts,
  courseId,
  organizationId
) => {
  return parts.map(({ number, price, id }) =>
    Object.assign({
      totalUnits: number,
      remainingUnits: number,
      unitPrice: price,
      organizationId,
      courseId,
      partId: id,
    })
  );
};
