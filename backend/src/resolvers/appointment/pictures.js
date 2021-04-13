import { prisma } from '@';

const pictures = ({ id }) => {
  return prisma.appointment
    .findOne({ where: { id } })
    .pictures({ include: { file: true } })
    .then(pics =>
      pics.map(({ comment, file: { id, url } }) => ({
        id,
        comment,
        url,
      }))
    );
};

export default pictures;