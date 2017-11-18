/* Configuração do Banco de dados realizar conexão com o banco 

Alunos: Ana Carolina Prates Santi e Igor Fraga de Andrade

16/11/2017 */
const path = require('path');

// local da base de dados
const database = path.join(__dirname, '..', 'db.sqlite');

const connection = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: database,
  },
  useNullAsDefault: true,
});

module.exports = connection;