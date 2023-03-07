const { init } = require("./src/db");
const {
  createOrganization,
  createPatients,
  createUser,
  createView,
  createFieldGroup,
  createNestedSelectorField,
  createOtherFields,
  createAppointments,
  clearDB,
  createBranch,
  createSpecialty,
  createBranchToSpecialty,
  createUserSpecialty,
  activateView,
} = require("./src/query");
const {
  importPatients,
  extractCategoriesAndItems,
  extractAppointmentsData,
} = require("./src/xlsx");

let ORGANIZATION_ID;
let USER_ID;
let PATIENTS_INFO;
let VIEW_ID;
let FIELD_GROUP_ID;
let FIELD_ID;
let DOCTOR_ID;
let BRANCH_ID;
let SPEICIALTY_ID;
(async () => {
  try {
    const client = await init();
    /////////////////////////////////////////////////////////////////////
    await clearDB(client);
    /////////////////////////////////////////////////////////////////////
    const orgainzaiontId = await createOrganization(client);
    ORGANIZATION_ID = orgainzaiontId;
    /////////////////////////////////////////////////////////////////////
    const branchId = await createBranch(client, {
      organizationId: ORGANIZATION_ID,
    });
    BRANCH_ID = branchId;
    /////////////////////////////////////////////////////////////////////
    const specialtyId = await createSpecialty(client, {
      organizationId: ORGANIZATION_ID,
    });
    SPEICIALTY_ID = specialtyId;
    /////////////////////////////////////////////////////////////////////
    const branchToSpecialty = await createBranchToSpecialty(client, {
      branchId: BRANCH_ID,
      specialtyId: SPEICIALTY_ID,
    });
    SPEICIALTY_ID = specialtyId;
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
    await createUserSpecialty(client, {
      organizationId: ORGANIZATION_ID,
      branchId: BRANCH_ID,
      specialtyId: SPEICIALTY_ID,
      doctorId: DOCTOR_ID,
    });
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
    /////////////////////////////////////////////////////////////////////
    await activateView(client, {
      userId: USER_ID,
      viewId: VIEW_ID,
    });
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
      choices,
      nestedFieldId: FIELD_ID,
      specialtyId: SPEICIALTY_ID,
      branchId: BRANCH_ID,
    });
    /////////////////////////
    ("done successfully");
  } catch (error) {
    (error.message);
  }
})();
