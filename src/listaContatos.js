/* Monstra todos os usuarios já cadastrados no banco de dados

Alunos: Ana Carolina Prates Santi e Igor Fraga de Andrade

16/11/2017*/
const knex = require('./database');

// listaContatos
module.exports = () => {
    const sql = `
        (
            SELECT pessoa.nome FROM pessoa
                WHERE id != 1
        ) UNION (
            SELECT grupo.nome FROM grupo
        ) ORDER BY nome ASC
    `;

    /*Monstra os contatos do usuario cadastrados */
    knex.raw(sql).then(([ registros ]) => {
            
        if (registros && registros.length > 0) {
            console.log('Lista de contatos e grupos');
            registros.forEach((registro) => {
                console.log(registro.nome)
            });
        } else {
            console.log('Sem contatos ou grupos registrados!');
        }
    });

};
