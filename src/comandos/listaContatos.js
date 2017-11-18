/* Monstra todos os usuarios já cadastrados no banco de dados

Alunos: Ana Carolina Prates Santi e Igor Fraga de Andrade

16/11/2017*/
const knex = require('../database');

// listaContatos
module.exports = async () => {
    const pessoas = await knex.select('nome', 'ip')
        .from('pessoa')
        .whereNot('id', 1);
    const grupos = await knex.select('nome')
        .from('grupo');

    if (pessoas.length === 0 && grupos.length === 0) {
        console.info('Sem contatos ou grupos registrados!');
        return;
    }

    if (pessoas.length > 0) {
        console.info('Seus contatos:');
        for (let i = 0; i < pessoas.length; i++) {
            console.info(pessoas[i].nome + ' (' + pessoas[i].ip + ')');
        }
        console.info();
    }

    if (grupos.length > 0) {
        console.info('Seus grupos:');
        for (let i = 0; i < grupos.length; i++) {
            console.info(grupos[i].nome);
        }
        console.info();
    }
};
