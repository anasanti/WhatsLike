/* Insere nome e ip no banco de dados 

Alunos: Ana Carolina Prates Santi e Igor Fraga de Andrade

16/11/2017*/

const knex = require('../database');
const validacao = require('../validacao');


// listaContatos
module.exports = async (nome, ip) => {

    /*Utiliza o metodo de validação para validar nome e ip */
    if(validacao.validanome(nome) === false || validacao.validaip(ip) === false){
        return;
    }
    
    /*Transforma o texto em caixa baixa e remove os espaços*/
    nome = nome.toLowerCase().trim();

    /*Faz conexão com a base de dados para a inserção do usuario */
    const pessoa = await knex.first('id').where('nome', nome).from('pessoa');
    if (pessoa) {
        console.info('Contato ' + nome + ' já registrado');
    }

    await knex('pessoa').insert({
        nome: nome, 
        ip: ip
    });
};
