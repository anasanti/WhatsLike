const knex = require('./database');
const validacao = require('./validacao');


// listaContatos
module.exports = (nome, ip) => {

    if(validacao.validanome(nome) === false || validacao.validaip(ip) === false){
        return;
    }
    
    nome = nome.toLowerCase();

    knex.select('id').where('nome', nome).from('pessoa').then((resultados) => {
        if (resultados.length === 0){
            knex('pessoa').insert({
                nome : nome, 
                ip : ip
            }).then(() => {
                console.log('Dados inseridos com sucesso');
            });
        }else{
            console.log('Nome já inserido');
        }
    });
       
};
