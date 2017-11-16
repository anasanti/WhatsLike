/* Lista os grupos inseridos no banco

Alunos: Ana Carolina Prates Santi e Igor Fraga de Andrade

16/11/2017*/
const knex = require('./database');

/*A parte de inserção e troca de mensagens em grupos não foi inserido */

module.exports = () => {

    const sql = `
    INSERT INTO grupo nome 
        VALUES (?)
`;

/*Puxa do banco de dados os nomes do grupo inseridos */
knex.raw(sql).then(([ nome, registros ]) => {
                
            if (registros && registros.length > 0) {
                console.log('Lista de grupos');
                registros.forEach((registro) => {
                    console.log(registro.nome)
    
                });
            } else {
                console.log('Sem grupos registrados!');
            }
        });

}
