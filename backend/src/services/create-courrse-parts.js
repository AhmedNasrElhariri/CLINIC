import { prisma } from '@';

export const createCourseParts = async data => {
  return Promise.all(data.map(d => prisma.coursePart.create({ data: d })));
};
export const createCoursePartsFromCourse = (
  parts,
  courseId,
  organizationId
) => {
  return parts.map(({ price, id, numberOfUnits, number }, index) =>
    Object.assign({
      totalUnits: numberOfUnits,
      remainingUnits: numberOfUnits,
      unitPrice: (number * price) / numberOfUnits,
      organizationId,
      courseId,
      partId: id,
      seq: index,
    })
  );
};
