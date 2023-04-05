const moment = require('moment');

const { split, uuid, dataToCreateAppointments } = require('./helpers');

const createMultipleInsretValues = (totalNo, paramCount) =>
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

const clearDB = async client => {
  const text = `truncate "Organization" CASCADE;`;
  await client.query(text);
};

const createOrganization = async client => {
  const text = `INSERT INTO public."Organization"("id", "name") VALUES($1, $2) RETURNING "id"`;
  const values = [uuid(), 'Lushelle'];
  const res = await client.query(text, values);
  return res.rows[0].id;
};

const createUser = async (client, { organizationId, position, email }) => {
  const text = `INSERT INTO public."User"("id", "name","email","password","organizationId","position") VALUES($1, $2,$3,$4,$5,$6) RETURNING "id"`;
  const values = [
    uuid(),
    'Lushelle',
    email,
    '$2y$10$SNCOdQYWg64E.GBx5iUPIuTDeb7pGwUad.XXgrRP0A7t2B/wWcW/W',
    organizationId,
    position,
  ];
  const res = await client.query(text, values);
  return res.rows[0].id;
};

const createDoctors = async (client, { doctors, organizationId }) => {
  const text = `INSERT INTO public."User"("id", "name","email","password","organizationId","position") ${createMultipleInsretValues(
    doctors.length,
    6
  )} RETURNING "id", "email"`;
  const values = doctors.reduce(
    (acc, { name, email }) => [
      ...acc,
      uuid(),
      name,
      email,
      '$2y$10$SNCOdQYWg64E.GBx5iUPIuTDeb7pGwUad.XXgrRP0A7t2B/wWcW/W',
      organizationId,
      'Doctor',
    ],
    []
  );
  const res = await client.query(text, values);
  return res.rows.reduce((acc, { id, email }) => ({ ...acc, [email]: id }), {});
};

const createBranch = async (client, { organizationId }) => {
  const text = `INSERT INTO public."Branch"("id", "name","organizationId") VALUES($1, $2,$3) RETURNING "id"`;
  const values = [uuid(), 'Lushelle', organizationId];
  const res = await client.query(text, values);
  return res.rows[0].id;
};

const createSpecialty = async (client, { organizationId }) => {
  const text = `INSERT INTO public."Specialty"("id", "name","organizationId") VALUES($1, $2,$3) RETURNING "id"`;
  const values = [uuid(), 'Dermatalogy', organizationId];
  const res = await client.query(text, values);
  return res.rows[0].id;
};

const createBranchToSpecialty = async (client, { branchId, specialtyId }) => {
  const text = `INSERT INTO public."_BranchToSpecialty"("A","B")VALUES ($1, $2)`;
  const values = [branchId, specialtyId];
  await client.query(text, values);
};

const createUserSpecialty = async (
  client,
  { organizationId, branchId, specialtyId, doctorIds }
) => {
  const text = `INSERT INTO public."UserSpecialty"("id","organizationId", "branchId","specialtyId","userId") ${createMultipleInsretValues(
    doctorIds.length,
    5
  )} RETURNING "id"`;
  const values = doctorIds.reduce(
    (acc, doctorId) => [
      ...acc,
      uuid(),
      organizationId,
      branchId,
      specialtyId,
      doctorId,
    ],
    []
  );
  return await client.query(text, values);
};

const createView = async (client, { userId }) => {
  const text = `INSERT INTO public."View"("id", "name", "type", "userId") VALUES($1, $2, $3, $4) RETURNING "id"`;
  const values = [uuid(), 'Dynamic view', 'Session', userId];
  const res = await client.query(text, values);
  return res.rows[0].id;
};

const activateView = async (client, { viewId, userId }) => {
  const text = `INSERT INTO public."ViewStatus"("id","userId","activeViewId") VALUES($1, $2, $3) RETURNING "id"`;
  const values = [uuid(), userId, viewId];
  await client.query(text, values);
};

const createFieldGroup = async (client, { viewId }) => {
  const text = `INSERT INTO public."FieldGroup"("id", "name", "order", "viewId", "status") VALUES($1, $2, $3, $4, $5) RETURNING "id"`;
  const values = [uuid(), 'Main', 0, viewId, 'Static'];
  const res = await client.query(text, values);
  return res.rows[0].id;
};

const createNestedSelectorField = async (client, { fieldGroupId, choices }) => {
  const text = `INSERT INTO public."Field"("id", "name", "order", "type", "choices", "fieldGroupId", "dynamic") VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING "id"`;
  const values = [
    uuid(),
    'Category / Items',
    0,
    'NestedSelector',
    JSON.stringify(JSON.stringify(choices)),
    fieldGroupId,
    false,
  ];
  const res = await client.query(text, values);
  return res.rows[0].id;
};

const createOtherFields = async (client, { fieldGroupId }) => {
  const names = ['Total Cost', 'Payment', 'Remaining'];
  const queries = names.map((name, index) => {
    const text = `INSERT INTO public."Field"("id", "name", "order", "type", "fieldGroupId", "dynamic") VALUES($1, $2, $3, $4, $5, $6) RETURNING "id","name"`;
    const values = [uuid(), name, index + 1, 'Number', fieldGroupId, false];

    return client
      .query(text, values)
      .then(res => ({ id: res.rows[0].id, name: res.rows[0].name }));
  });
  return Promise.all(queries);
};

const createPatients = async (client, { data, organizationId, userId }) => {
  const chunks = split(data, 500);
  const result = [];
  for await (const chunk of chunks) {
    const text = `INSERT INTO public."Patient"("id", "name", "phoneNo", "sex", "code", "organizationId", "type", "age", "userId") ${createMultipleInsretValues(
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

const createAppointments = async (
  client,
  {
    organizationId,
    userId,
    appointments,
    patientsInfo,
    otherFieldsValues,
    choices,
    nestedFieldId,
    specialtyId,
    branchId,
    doctorEmailsVsIds,
  }
) => {
  const { apps, appFields } = await dataToCreateAppointments(
    appointments,
    patientsInfo,
    otherFieldsValues,
    choices,
    nestedFieldId,
    doctorEmailsVsIds
  );
  const chunks = split(apps, 500);
  const fieldsChunks = split(appFields, 500);
  for await (const chunk of chunks) {
    const values = chunk.reduce(
      (acc, { patientId, date, doctorId, appId, status }) => [
        ...acc,
        appId,
        moment(date).set('hours', 10).format('YYYY-MM-DD HH:mm:ss'),
        patientId,
        organizationId,
        userId,
        doctorId,
        'Session',
        status,
        specialtyId,
        branchId,
      ],
      []
    );
    const text = `INSERT INTO public."Appointment"("id", "date", "patientId", "organizationId", "userId", "doctorId", "type","status", "specialtyId", "branchId") ${createMultipleInsretValues(
      chunk.length,
      10
    )} RETURNING "id"`;
    await client.query(text, values);
  }

  for await (const chunk of fieldsChunks) {
    const values = chunk.reduce(
      (acc, { appId, fieldId, value }) => [
        ...acc,
        uuid(),
        appId,
        fieldId,
        Array.isArray(value) ? JSON.stringify(value) : value,
      ],
      []
    );
    const text = `INSERT INTO public."AppointmentField"("id", "appointmentId", "fieldId", "value") ${createMultipleInsretValues(
      chunk.length,
      4
    )} RETURNING "id"`;
    await client.query(text, values);
  }
};
const getIds = rows => {
  let ids = '';
  ids += rows.reduce(
    (acc, { id }, index) =>
      acc + `'${id}'${index < rows.length - 1 ? ',' : ''}`,
    ''
  );
  return '(' + ids + ')';
};
const queryString = async rows => {
  const chunks = split(rows, 50);
  let q = '';
  for await (const chunk of chunks) {
    chunk.forEach(r => {
      q += `WHEN '${r.id}' THEN '[${r.value}]' \n`;
    });
  }
  return q;
};
const updateQueryWithChunks = async (rows, client) => {
  const chunks = split(rows, 100);
  for await (const chunk of chunks) {
    const appointmentFieldsIds = getIds(chunk);
    const queryStrings = await queryString(chunk);
    const query = `UPDATE public."AppointmentField"
                   SET value 
                   = CASE id
                   ${queryStrings}
                   END
                   WHERE id IN${appointmentFieldsIds};`;
    await client.query(query);
  }
};
const updateAllAppointmentsFieldsByOrgainzationId = async (
  client,
  { orgainzaiontId }
) => {
  const text = `SELECT id FROM public."Appointment" WHERE "organizationId"='${orgainzaiontId}' `;
  const appointments = await client.query(text);
  const appIds = getIds(appointments.rows);
  const text2 = `SELECT AF.value, AF.id FROM public."AppointmentField" AF inner join "Field" F on F.id = AF."fieldId" WHERE F.type!='NestedSelector' AND AF."appointmentId" IN${appIds}`;
  const appointmentsFields = await client.query(text2);
  await updateQueryWithChunks(appointmentsFields.rows, client);
};

module.exports = {
  clearDB,
  createOrganization,
  createPatients,
  createUser,
  createDoctors,
  createView,
  createFieldGroup,
  createNestedSelectorField,
  createOtherFields,
  createAppointments,
  createBranch,
  createSpecialty,
  createBranchToSpecialty,
  createUserSpecialty,
  activateView,
  updateAllAppointmentsFieldsByOrgainzationId,
};
