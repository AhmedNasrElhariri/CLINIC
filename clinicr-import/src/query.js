const crypto = require("crypto");
const moment = require("moment");

const { split, uuid, dataToCreateAppointments } = require("./helpers");

const createMuitipleInsetValues = (totalNo, paramCount) =>
  "VALUES " +
  new Array(totalNo)
    .fill(0)
    .map(
      (val, index) =>
        `(${new Array(paramCount)
          .fill(0)
          .map((_, paramIndex) => `$${index * paramCount + (paramIndex + 1)}`)
          .join(", ")})`
    )
    .join(", ");

const clearDB = async (client) => {
  const text = `truncate "Organization" CASCADE;`;
  await client.query(text);
};

const createOrganization = async (client) => {
  const text = `INSERT INTO public."Organization"("id", "name") VALUES($1, $2) RETURNING "id"`;
  const values = [uuid(), "ClinicR Test"];
  const res = await client.query(text, values);
  return res.rows[0].id;
};

const createUser = async (client, { organizationId, position, email }) => {
  const text = `INSERT INTO public."User"("id", "name","email","password","organizationId","position") VALUES($1, $2,$3,$4,$5,$6) RETURNING "id"`;
  const values = [
    uuid(),
    "ClinicR Test",
    email,
    "$2y$10$SNCOdQYWg64E.GBx5iUPIuTDeb7pGwUad.XXgrRP0A7t2B/wWcW/W",
    organizationId,
    position,
  ];
  const res = await client.query(text, values);
  return res.rows[0].id;
};

const createBranch = async (client, { organizationId }) => {
  const text = `INSERT INTO public."Branch"("id", "name","organizationId") VALUES($1, $2,$3) RETURNING "id"`;
  const values = [uuid(), "Alex", organizationId];
  const res = await client.query(text, values);
  return res.rows[0].id;
};
const createSpecialty = async (client, { organizationId }) => {
  const text = `INSERT INTO public."Specialty"("id", "name","organizationId") VALUES($1, $2,$3) RETURNING "id"`;
  const values = [uuid(), "Dermatalogy", organizationId];
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
  { organizationId, branchId, specialtyId, doctorId }
) => {
  const text = `INSERT INTO public."UserSpecialty"("id","organizationId", "branchId","specialtyId","userId") VALUES($1, $2,$3,$4,$5) RETURNING "id"`;
  const values = [uuid(), organizationId, branchId, specialtyId, doctorId];
  const res = await client.query(text, values);
  return res.rows[0].id;
};
const createView = async (client, { userId }) => {
  const text = `INSERT INTO public."View"("id", "name", "type", "userId") VALUES($1, $2, $3, $4) RETURNING "id"`;
  const values = [uuid(), "Dynamic view", "Session", userId];
  const res = await client.query(text, values);
  return res.rows[0].id;
};

const createFieldGroup = async (client, { viewId }) => {
  const text = `INSERT INTO public."FieldGroup"("id", "name", "order", "viewId", "status") VALUES($1, $2, $3, $4, $5) RETURNING "id"`;
  const values = [uuid(), "Main", 0, viewId, "Static"];
  const res = await client.query(text, values);
  return res.rows[0].id;
};

const createNestedSelectorField = async (client, { fieldGroupId, choices }) => {
  const text = `INSERT INTO public."Field"("id", "name", "order", "type", "choices", "fieldGroupId", "dynamic") VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING "id"`;
  const values = [
    uuid(),
    "Category / Items",
    0,
    "NestedSelector",
    JSON.stringify(choices),
    fieldGroupId,
    false,
  ];
  const res = await client.query(text, values);
  return res.rows[0].id;
};

const createOtherFields = async (client, { fieldGroupId }) => {
  const names = ["Total Cost", "Payment", "Remaining"];
  const queries = names.map((name, index) => {
    const text = `INSERT INTO public."Field"("id", "name", "order", "type", "fieldGroupId", "dynamic") VALUES($1, $2, $3, $4, $5, $6) RETURNING "id","name"`;
    const values = [uuid(), name, index + 1, "Number", fieldGroupId, false];

    return client
      .query(text, values)
      .then((res) => ({ id: res.rows[0].id, name: res.rows[0].name }));
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
        "Primary",
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
    doctorId,
    data,
    patientsInfo,
    otherFieldsValues,
    choices,
    nestedFieldId,
  }
) => {
  const { apps, appFields } = dataToCreateAppointments(
    data,
    patientsInfo,
    otherFieldsValues,
    choices,
    nestedFieldId
  );
  const values = apps.reduce(
    (acc, { patientId, date, appId }) => [
      ...acc,
      appId,
      moment(date, "DD MM YYYY hh:mm:ss").toDate(),
      patientId,
      organizationId,
      userId,
      doctorId,
      "Session",
      "Archived",
    ],
    []
  );
  const text = `INSERT INTO public."Appointment"("id", "date", "patientId", "organizationId", "userId", "doctorId", "type","status") ${createMuitipleInsetValues(
    apps.length,
    8
  )} RETURNING "id"`;
  const res = await client.query(text, values);

  ////
  const values2 = appFields.reduce(
    (acc, { appId, fieldId, value }) => [
      ...acc,
      uuid(),
      appId,
      fieldId,
      Array.isArray(value) ? JSON.stringify(value) : value,
    ],
    []
  );
  const text2 = `INSERT INTO public."AppointmentField"("id", "appointmentId", "fieldId", "value") ${createMuitipleInsetValues(
    appFields.length,
    4
  )} RETURNING "id"`;
  const res2 = await client.query(text2, values2);
};

module.exports = {
  clearDB,
  createOrganization,
  createPatients,
  createUser,
  createView,
  createFieldGroup,
  createNestedSelectorField,
  createOtherFields,
  createAppointments,
  createBranch,
  createSpecialty,
  createBranchToSpecialty,
  createUserSpecialty,
};
