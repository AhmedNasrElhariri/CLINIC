import { prisma } from '@';

const addCourse = async (_, { course }, { userId }) => {
  const { patientId, courseDefinitionId,appointmentId, ...rest } = course;
  return prisma.course.create({
    data: {
      ...rest,
      user: {
        connect: {
          id: userId,
        },
      },
      doctor: {
        connect: {
          id: userId,
        },
      },
      patient: {
        connect: {
          id: patientId,
        },
      },
      courseDefinition: {
        connect: {
          id: courseDefinitionId,
        },
      },
      appointments:{
        create:{
          appointment:{
            connect:{
              id:appointmentId
            }
          }
        }
      }
    },
  });
};

export default addCourse;
