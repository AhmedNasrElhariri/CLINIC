import { prisma } from '@';

const getPatients = (q, { organizationId }) => {
  return prisma.$queryRaw(
    `SELECT * FROM "Patient" WHERE "organizationId" = '${organizationId}' AND ("name" ILIKE '%${q}%' OR "phoneNo" ILIKE '%${q}%');`
  );
};

const getSnippets = (q, { organizationId }) => {
  return prisma.$queryRaw(
    `SELECT * FROM "Snippet" WHERE (title ILIKE '%${q}%' OR "body" ILIKE '%${q}%');`
  );
};

const search = (_, { q, patient = true, sinppet = true }, context) => {
  /* eslint-disable no-undef */
  return Promise.all([getPatients(q, context), getSnippets(q, context)]).then(
    ([patients, snippets]) => ({
      patients,
      snippets,
    })
  );
};

export default search;
