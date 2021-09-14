import { prisma } from '@';

const addFaceOperation = async (
  _,
  { faceOperation },
  { userId, organizationId }
) => {
  const { materialId, patientId, facePartationNumber,facePartationName,units } = faceOperation;
  const facePartation = await prisma.facePartation.findMany({
    where: {
      number: facePartationNumber,
    },
  });
  if(facePartation.length > 0 ){
     await prisma.faceOperation.create({
         data:{
             patient:{
                 connect:{
                     id:patientId,
                 },
             },
             facePartation:{
                 connect:{
                     id:facePartation[0].id,
                 },
             },
             material:{
                 connect:{
                   id:materialId,
                 },
             },
             organization:{
               connect:{
                 id:organizationId,
               },
             },
             user:{
               connect:{
                 id:userId,
               },
             },
             date:new Date(),
             units:units,
         },
     });
    return facePartation[0];
  }else{
      const facePartationNew = await prisma.facePartation.create({
        data:{
          number:facePartationNumber,
          name:facePartationName,
          patient:{
            connect:{
              id:patientId,
            },
          },
          organization:{
               connect:{
                 id:organizationId,
               },
             },
             user:{
               connect:{
                 id:userId,
               },
             },
        }
      });
      await prisma.faceOperation.create({
         data:{
             patient:{
                 connect:{
                     id:patientId,
                 },
             },
             facePartation:{
                 connect:{
                     id:facePartationNew.id,
                 },
             },
             material:{
                 connect:{
                   id:materialId,
                 },
             },
             organization:{
               connect:{
                 id:organizationId,
               },
             },
             user:{
               connect:{
                 id:userId,
               },
             },
             date:new Date(),
             units: units,
         },
     }); 
     return facePartationNew
  }  
};

export default addFaceOperation;
