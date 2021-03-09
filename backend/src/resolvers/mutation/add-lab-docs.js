import { prisma } from '@';

const addLabDocs = async (_, { DocumentLabInput }) => {
  const { labId, value, files } = DocumentLabInput;
  // let persistedPatientLab = await prisma.patientLab.findOne({
  //   where: {
  //     name_patientId_unique_constraint: {
  //       name,
  //       patientId,
  //     },
  //   },
  //   include: {
  //     documents: true,
  //   },
  // });
  // if (!persistedPatientLab) {
  //   return prisma.patientLab.create({
  //     data: {
  //       name,
  //       patient: {
  //         connect: {
  //           id: patientId,
  //         },
  //       },
  //       documents: {
  //         create: documents.map(id => ({
  //           file: {
  //             connect: {
  //               id,
  //             },
  //           },
  //         })),
  //       },
  //     },
  //   });
  // }
  return prisma.labDocument.update({
    data: {
      files:[],
      //  {
      //   connect: labDocument.files.map(({ id }) => ({
      //     id,
      //   })),
      //   create: files.map(id => ({
      //     file: {
      //       connect: {
      //         id,
      //       },
      //     },
      //   })),
      // },
      value: value,
    },
    where: { id: labId },
  });
};

export default addLabDocs;
