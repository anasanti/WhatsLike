const knex = require('./database');

module.exports = () => {

    const sql = `
    INSERT INTO grupo nome 
        VALUES (?)
`;


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
