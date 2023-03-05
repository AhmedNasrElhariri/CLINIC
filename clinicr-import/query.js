const crypto = require('crypto');
const { split, uuid } = require('./helpers');

const createMuitipleInsetValues = (totalNo, paramCount) =>
  'VALUES ' +
  new Array(totalNo)
    .fill(0)
    .map(
      (val, index) =>
        `(${new Array(paramCount)
          .fill(0)
          .map((_, paramIndex) => `$${index * paramCount + (paramIndex + 1)}`)
          .join(', ')})`
    )
    .join(', ');

const createOrganization = async client => {
  const text = `INSERT INTO public."Organization"("id", "name") VALUES($1, $2) RETURNING "id"`;
  const values = [crypto.randomUUID(), 'ClinicR Test'];
  const res = await client.query(text, values);
  return res.rows[0].id;
};

const createUser = async (client, { organizationId }) => {
  const text = `INSERT INTO public."User"("id", "name","email","password","organizationId","position") VALUES($1, $2,$3,$4,$5,$6) RETURNING "id"`;
  const values = [
    crypto.randomUUID(),
    'ClinicR Test',
    'admin@clinicr.net',
    '$2y$10$SNCOdQYWg64E.GBx5iUPIuTDeb7pGwUad.XXgrRP0A7t2B/wWcW/W',
    organizationId,
    'Admin',
  ];
  const res = await client.query(text, values);
  return res.rows[0].id;
};

const createView = async (client, { userId }) => {
  const text = `INSERT INTO public."View"("id", "name", "type", "userId") VALUES($1, $2, $3, $4) RETURNING "id"`;
  const values = [crypto.randomUUID(), 'Dynamic view', 'Session', userId];
  const res = await client.query(text, values);
  return res.rows[0].id;
};

const createFieldGroup = async (client, { viewId }) => {
  const text = `INSERT INTO public."FieldGroup"("id", "name", "order", "viewId", "status") VALUES($1, $2, $3, $4, $5) RETURNING "id"`;
  const values = [crypto.randomUUID(), 'Main', 0, viewId, 'Static'];
  const res = await client.query(text, values);
  return res.rows[0].id;
};

const createNestedSelectorField = async (client, { fieldGroupId, choices }) => {
  const text = `INSERT INTO public."Field"("id", "name", "order", "type", "choices", "fieldGroupId", "dynamic") VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING "id"`;
  const values = [
    crypto.randomUUID(),
    'Category / Items',
    0,
    'NestedSelector',
    JSON.stringify(choices),
    fieldGroupId,
    false,
  ];
  const res = await client.query(text, values);
  return res.rows[0].id;
};

const createOtherFields = async (client, { fieldGroupId }) => {
  const names = ['Total Cost', 'Payment', 'Remaining'];
  const queries = names.map((name, index) => {
    const text = `INSERT INTO public."Field"("id", "name", "order", "type", "fieldGroupId", "dynamic") VALUES($1, $2, $3, $4, $5, $6) RETURNING "id"`;
    const values = [
      crypto.randomUUID(),
      name,
      index + 1,
      'Number',
      fieldGroupId,
      false,
    ];

    return client.query(text, values).then(res => res.rows[0].id);
  });
  return Promise.all(queries);
};

const createPatients = async (client, { data, organizationId, userId }) => {
  const chunks = split(data, 100);
  const result = [];
  for await (const chunk of chunks) {
    const text = `INSERT INTO public."Patient"("id", "name", "phoneNo", "sex", "code", "organizationId", "type", "age", "userId") ${createMuitipleInsetValues(
      chunk.length,
      9
    )} RETURNING "id", "phoneNo"`;
    const values = chunk.reduce(
      (acc, { name, phoneNo, sex, code }) => [
        ...acc,
        uuid(),
        name,
        phoneNo,
        sex,
        code,
        organizationId,
        'Primary',
        30,
        userId,
      ],
      []
    );
    const res = await client.query(text, values);
    const ids = res.rows.map(({ id, phoneNo }) => ({
      id,
      phoneNo,
    }));
    result.push(...ids);
  }
  return result.reduce(
    (acc, { id, phoneNo }) => ({ ...acc, [phoneNo]: id }),
    {}
  );
};

module.exports = {
  createOrganization,
  createPatients,
  createUser,
  createView,
  createFieldGroup,
  createNestedSelectorField,
  createOtherFields,
};
