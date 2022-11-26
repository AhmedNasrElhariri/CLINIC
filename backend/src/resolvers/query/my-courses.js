import { prisma } from '@';

const sortByCourseId = (courseIds, courses) => {
  let newCourses = [];
  courseIds.forEach(cId => {
    newCourses.push(courses.find(c => c.id === cId));
  });
  return newCourses;
};
const myCourses = async (
  _,
  { patientId, offset, limit, status, courseId, sortType },
  { organizationId }
) => {
  const coursesNumber = await prisma.course.count({
    where: {
      patient: {
        organization: {
          id: organizationId,
        },
      },
    },
  });
  let newStatus = [];
  newStatus =
    status === 'Finished'
      ? ['Finished', 'EarlyFinished']
      : status === 'Cancelled'
      ? ['Cancelled', 'Rejected']
      : ['InProgress', 'InProgress'];
  // const courses = await prisma.course.findMany({
  //   where: Object.assign(
  //     {
  //       patient: {
  //         organization: {
  //           id: organizationId,
  //         },
  //       },
  //     },
  //     patientId && { patientId: patientId },
  //     status && { status: status },
  //     courseId && {
  //       courseDefinition: {
  //         id: courseId,
  //       },
  //     }
  //   ),
  //   orderBy: {
  //     paid: sortType,
  //   },
  //   skip: offset,
  //   take: limit,
  // });
  const courses = await prisma.$queryRaw`SELECT C."id" As "courseId" FROM public."Course" AS C INNER JOIN public."Patient" AS P on C."patientId" = P."id"   WHERE P."organizationId" = ${organizationId} AND (CASE WHEN ${patientId} like '_%' THEN P."id" = ${patientId} ELSE P."id" like '_%' END) AND  (CASE WHEN ${status} like '_%' THEN (C."status"::text = ${newStatus[0]} OR C."status"::text = ${newStatus[1]}) ELSE C."status" = 'InProgress' END) ORDER BY (C.price - C.paid) DESC LIMIT ${limit} OFFSET ${offset}`;

  let coursesIds = [];
  courses.forEach(c => {
    coursesIds.push(c.courseId);
  });
  const newCourses = await prisma.course.findMany({
    where: { id: { in: coursesIds } },
    include: {
      courseDefinition: true,
      user: true,
      doctor: true,
      sessions: true,
      patient: true,
    },
  });
  const sortedCourses = sortByCourseId(coursesIds, newCourses);
  const data = {
    courses: sortedCourses,
    coursesCount: coursesNumber,
  };
  return data;
};

export default myCourses;
