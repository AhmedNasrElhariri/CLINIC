import { prisma } from '@';
import { APIExceptcion } from '@/services/erros.service';

const setActiveView = async (_, { viewId }, { userId }) => {
  const view = await prisma.view.findUnique({ where: { id: viewId } });
  if (!view) {
    throw APIExceptcion('invalid view');
  }

  const viewStatus = await prisma.viewStatus
    .findMany({
      where: {
        userId,
        activeView: {
          type: view.type,
        },
      },
    })
    .then(viewStatus => (viewStatus.length ? viewStatus[0] : {}));

  const upsertObj = {
    activeView: {
      connect: {
        id: viewId,
      },
    },
    user: {
      connect: {
        id: userId,
      },
    },
  };

  return prisma.viewStatus.upsert({
    create: upsertObj,
    update: { ...upsertObj },
    where: {
      id: viewStatus.id || '',
    },
  });
};

export default setActiveView;
