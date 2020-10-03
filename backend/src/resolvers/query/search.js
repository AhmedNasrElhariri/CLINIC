import { prisma } from '@';

const getPatients = q => {
  return prisma.$queryRaw(
    `SELECT * FROM "Patient" WHERE "name" ILIKE '%${q}%' OR "phoneNo" ILIKE '%${q}%';`
  );
};

const getSnippets = q => {
  return prisma.$queryRaw(
    `SELECT * FROM "Snippet" WHERE title ILIKE '%${q}%' OR "body" ILIKE '%${q}%';`
  );
};

const search = (_, { q, patient = true, sinppet = true }) => {
  /* eslint-disable no-undef */
  return Promise.all([getPatients(q), getSnippets(q)]).then(
    ([patients, snippets]) => ({
      patients,
      snippets,
    })
  );
};

export default search;
