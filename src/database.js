/* DB Config */
const connection = require('knex')({
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'whatslike',
      supportBigNumbers: true,
      bigNumberStrings: true,
      multipleStatements: true,
      dateStrings: true
    },
    pool: { min: 1, max: 3 },
  });
  
  module.exports = connection;
  