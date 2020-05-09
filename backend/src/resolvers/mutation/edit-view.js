import { prisma } from '@';
import * as R from 'ramda';

const flattenFields = groups => {
  const fields = groups.map(group => group.fields.map(f => ({ ...f, group })));

  return R.flatten(fields);
};

const getFieldValues = field =>
  R.pick(['id', 'name', 'order', 'type', 'required'])(field);

const editView = async (_, { groups }) => {
  const newGroups = groups.filter(g => !g.id);
  const oldGroups = groups.filter(g => g.id);

  //create new group fields
  const newGroups$ = newGroups.map(g =>
    prisma.fieldGroup.create({
      data: R.omit(['fields'])(g),
    })
  );
  // eslint-disable-next-line no-undef
  const persistedGroups = await Promise.all(newGroups$);

  // update existedGroups
  const oldGroups$ = oldGroups.map(({ id, name }) =>
    prisma.fieldGroup.updateMany({
      data: {
        name,
      },
      where: { id },
    })
  );
  // eslint-disable-next-line no-undef
  await Promise.all(oldGroups$);

  //update ids
  newGroups.forEach((g, idx) => {
    g.id = persistedGroups[idx].id;
  });

  const fields = flattenFields(oldGroups.concat(newGroups));

  await await prisma.raw`UPDATE public."Field" SET "fieldGroupId"= null`;

  // update all fields
  const updateFields$ = fields.map(f => {
    const args = {
      data: {
        ...getFieldValues(f),
        fieldGroup: {
          connect: { id: f.group.id },
        },
      },
    };
    return f.id
      ? prisma.field.update({
          ...args,
          where: { id: f.id },
        })
      : prisma.field.create(args);
  });

  // eslint-disable-next-line no-undef
  return Promise.all(updateFields$)
    .then(() => true)
    .catch(() => false);
};

export default editView;
