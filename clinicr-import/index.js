const { init } = require('./db');
const {
  createOrganization,
  createPatients,
  createUser,
  createView,
  createFieldGroup,
  createNestedSelectorField,
  createOtherFields,
} = require('./query');
const { importPatients, extractCategoriesAndItems, extractAppointmentsData } = require('./xlsx');

let ORGANIZATION_ID;
let USER_ID;
let PATIENTS_INFO;
let VIEW_ID;
let FIELD_GROUP_ID;
let FIELD_ID;

(async () => {
  try {
    const client = await init();
    return extractAppointmentsData()
    /////////////////////////////////////////////////////////////////////
    const orgainzaiontId = await createOrganization(client);
    ORGANIZATION_ID = orgainzaiontId;
    /////////////////////////////////////////////////////////////////////
    const userId = await createUser(client, {
      organizationId: ORGANIZATION_ID,
    });
    USER_ID = userId;
    /////////////////////////////////////////////////////////////////////
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
    await createOtherFields(client, { fieldGroupId: FIELD_GROUP_ID });
    //////////////////////////
    console.log('done successfully');
  } catch (error) {
    console.log(error.message);
  }
})();
