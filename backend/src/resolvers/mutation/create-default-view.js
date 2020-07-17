import { prisma } from '@';

const view = {
  name: 'Default View',
  fieldGroups: [
    {
      name: 'Vital Data',
      order: 0,
      fields: [
        {
          name: 'Height',
          required: false,
          type: 'Number',
          order: 0,
        },
        {
          name: 'Weight',
          required: false,
          type: 'Number',
          order: 1,
        },
        {
          name: 'Glucose Level',
          required: false,
          type: 'Number',
          order: 2,
        },
        {
          name: 'Pressure',
          required: false,
          type: 'Text',
          order: 3,
        },
      ],
    },
    {
      name: 'Complain And Symptoms',
      order: 1,
      fields: [
        {
          name: 'Complain',
          required: false,
          type: 'LongText',
          order: 0,
        },
        {
          name: 'Signs',
          required: false,
          type: 'LongText',
          order: 1,
        },
        {
          name: 'Symptoms',
          required: false,
          type: 'LongText',
          order: 2,
        },
      ],
    },
    {
      name: 'Recommendations',
      order: 2,
      fields: [
        {
          name: 'Prescription',
          required: false,
          type: 'LongText',
          order: 0,
        },
        {
          name: 'Recommendations',
          required: false,
          type: 'LongText',
          order: 1,
        },
      ],
    },
  ],
};

const createView = async (_, __, { userId }) => {
  const { name, fieldGroups } = view;

  const { id } = await prisma.view.create({
    data: {
      name,
      user: {
        connect: { id: userId },
      },
      fieldGroups: {
        create: fieldGroups.map(fg => ({
          ...fg,
          fields: {
            create: fg.fields,
          },
        })),
      },
    },
  });

  return prisma.viewStatus
    .create({
      data: {
        user: {
          connect: { id: userId },
        },
        activeView: {
          connect: { id: id },
        },
        defaultView: {
          connect: { id: id },
        },
      },
    })
    .then(() => true)
    .catch(() => false);
};

export default createView;
