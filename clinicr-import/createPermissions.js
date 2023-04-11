const { init } = require('./src/db');
const { createPatientViewPermission } = require('./src/query');

(async () => {
  try {
    const client = await init();
    /////////////////////////////////////////////////////////////////////
    await createPatientViewPermission(client);
    /////////////////////////////////////////////////////////////
    console.log('done successfully');
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
})();
