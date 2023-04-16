const { init } = require('./src/db');
const { updateAllAppointmentsFieldsByOrgainzationId } = require('./src/query');

(async () => {
  try {
    const client = await init();
    /////////////////////////////////////////////////////////////////////
    const orgainzaiontId = 'a48430c8-d15d-4ce6-8095-54f0a86efae4';
    await updateAllAppointmentsFieldsByOrgainzationId(client, {
      orgainzaiontId,
    });
    /////////////////////////////////////////////////////////////
    console.log('done successfully');
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
})();
