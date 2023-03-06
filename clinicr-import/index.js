const { init } = require("./db");
const {
  createOrganization,
  createPatients,
  createUser,
  createView,
  createFieldGroup,
  createNestedSelectorField,
  createOtherFields,
  createAppointments,
} = require("./query");
const {
  importPatients,
  extractCategoriesAndItems,
  extractAppointmentsData,
} = require("./xlsx");

let ORGANIZATION_ID;
let USER_ID;
let PATIENTS_INFO;
let VIEW_ID;
let FIELD_GROUP_ID;
let FIELD_ID;
let DOCTOR_ID;

(async () => {
  try {
    const client = await init();
    // return extractAppointmentsData()
    /////////////////////////////////////////////////////////////////////
    const orgainzaiontId = await createOrganization(client);
    ORGANIZATION_ID = orgainzaiontId;
    /////////////////////////////////////////////////////////////////////
    const userId = await createUser(client, {
      organizationId: ORGANIZATION_ID,
      position: "Admin",
      email: "admin@clinicr.net",
    });
    USER_ID = userId;
    /////////////////////////////////////////////////////////////////////
    const doctorId = await createUser(client, {
      organizationId: ORGANIZATION_ID,
      position: "Doctor",
      email: "doctor@clinicr.net",
    });
    DOCTOR_ID = doctorId;
    ////////////////////////////////////////////////////////////////////
    const patients = await importPatients();
    const patientsInfo = await createPatients(client, {
      data: patients,
      organizationId: ORGANIZATION_ID,
      userId: USER_ID,
    });
    PATIENTS_INFO = patientsInfo;
    /////////////////////////////////////////////////////////////////////
    const viewId = await createView(client, {
      userId: USER_ID,
    });
    VIEW_ID = viewId;
    //////////////////////////
    const fieldGroupId = await createFieldGroup(client, {
      viewId: VIEW_ID,
    });
    FIELD_GROUP_ID = fieldGroupId;
    //////////////////////////
    const choices = await extractCategoriesAndItems();
    const fieldId = await createNestedSelectorField(client, {
      fieldGroupId: FIELD_GROUP_ID,
      choices,
    });
    FIELD_ID = fieldId;
    //////////////////////////
    const otherFieldsValues = await createOtherFields(client, {
      fieldGroupId: FIELD_GROUP_ID,
    });
    //////////////////////////
    const appData = await extractAppointmentsData();
    await createAppointments(client, {
      organizationId: ORGANIZATION_ID,
      userId: USER_ID,
      doctorId: DOCTOR_ID,
      data: appData,
      patientsInfo: PATIENTS_INFO,
      otherFieldsValues: otherFieldsValues,
      choices: choices,
      nestedFieldId: FIELD_ID,
    });
    /////////////////////////
    console.log("done successfully");
  } catch (error) {
    console.log(error.message);
  }
})();
