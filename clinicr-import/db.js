const { Client } = require('pg');

const init = async () => {
  const client = new Client({
    database: 'clinicr_import',
    user: 'postgres',
    password: 'postgres',
  });
  await client.connect();
  return client;
};

module.exports = {
  init,
};
