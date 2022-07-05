import { prisma } from '@';

const changeLanguage = async (_, { lang }, { user }) => {
  const User = await prisma.user.update({
    data: {
      language: lang,
    },
    where: {
      id: user.id,
    },
  });

  return User;
};

export default changeLanguage;
