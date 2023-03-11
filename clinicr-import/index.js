const { init } = require('./src/db');
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
  createDoctors,
} = require('./src/query');
const {
  importPatients,
  extractCategoriesAndItems,
  extractAppointmentsData,
  importDoctors,
} = require('./src/xlsx');

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
    console.log('Start create organization');
    const orgainzaiontId = await createOrganization(client);
    ORGANIZATION_ID = orgainzaiontId;
    console.log('Finish create organization');
    /////////////////////////////////////////////////////////////////////
    console.log('Start create branch');
    const branchId = await createBranch(client, {
      organizationId: ORGANIZATION_ID,
    });
    BRANCH_ID = branchId;
    console.log('Finish create branch');
    /////////////////////////////////////////////////////////////////////
    console.log('Start create specialty');
    const specialtyId = await createSpecialty(client, {
      organizationId: ORGANIZATION_ID,
    });
    SPEICIALTY_ID = specialtyId;
    console.log('Finish create specialty');
    /////////////////////////////////////////////////////////////////////
    console.log('Start assign users to specialty');
    await createBranchToSpecialty(client, {
      branchId: BRANCH_ID,
      specialtyId: SPEICIALTY_ID,
    });
    SPEICIALTY_ID = specialtyId;
    console.log('Finish assign users to specialty');
    /////////////////////////////////////////////////////////////////////
    console.log('Start create admin');
    const userId = await createUser(client, {
      organizationId: ORGANIZATION_ID,
      position: 'Admin',
      email: 'admin@lushelle.com',
    });
    USER_ID = userId;
    console.log('Finish create admin');
    /////////////////////////////////////////////////////////////////////
    console.log('Start create doctors');
    const doctors = await importDoctors();
    const doctorEmailsVsIds = await createDoctors(client, {
      doctors,
      organizationId: ORGANIZATION_ID,
    });
    const doctorIds = Object.values(doctorEmailsVsIds);
    ////////////////////////////////////////////////////////////////////
    await createUserSpecialty(client, {
      organizationId: ORGANIZATION_ID,
      branchId: BRANCH_ID,
      specialtyId: SPEICIALTY_ID,
      doctorIds,
    });
    console.log('Finish create doctors');
    ////////////////////////////////////////////////////////////////////
    console.log('Start create patients');
    const patients = await importPatients();
    const patientsInfo = await createPatients(client, {
      data: patients,
      organizationId: ORGANIZATION_ID,
      userId: USER_ID,
    });
    PATIENTS_INFO = patientsInfo;
    console.log('Finish create patients');
    /////////////////////////////////////////////////////////////////////
    console.log('Start create view');
    const viewId = await createView(client, {
      userId: USER_ID,
    });
    VIEW_ID = viewId;
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
    console.log('Finish create view');
    //////////////////////////
    console.log('Start create Appointments');
    const appointments = await extractAppointmentsData();
    await createAppointments(client, {
      organizationId: ORGANIZATION_ID,
      userId: USER_ID,
      doctorEmailsVsIds,
      appointments,
      patientsInfo: PATIENTS_INFO,
      otherFieldsValues: otherFieldsValues,
      choices,
      nestedFieldId: FIELD_ID,
      specialtyId: SPEICIALTY_ID,
      branchId: BRANCH_ID,
    });
    console.log('Finish create Appointments');
    /////////////////////////
    console.log('done successfully');
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
})();
