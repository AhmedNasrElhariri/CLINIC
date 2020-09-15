import { prisma } from '@';

const setAvatar = async (_, { url }, { userId }) => {
  return prisma.user
    .update({
      data: {
        avatar: url,
      },
      where: {
        id: userId,
      },
    })
    .then(() => true)
    .catch(() => false);
};

export default setAvatar;
