/* Insere nome e ip no banco de dados 

Alunos: Ana Carolina Prates Santi e Igor Fraga de Andrade

16/11/2017*/

const knex = require('./database');
const validacao = require('./validacao');


// listaContatos
module.exports = (nome, ip) => {

    /*Utiliza o metodo de validação para validar nome e ip */
    if(validacao.validanome(nome) === false || validacao.validaip(ip) === false){
        return;
    }
    
    /*Transforma o texto em caixa baixa*/
    nome = nome.toLowerCase();

    /*Faz conexão com a base de dados para a inserção do usuario */
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
