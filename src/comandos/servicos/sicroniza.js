/* Metodo para o envio de mensagem 

Alunos: Ana Carolina Prates Santi e Igor Fraga de Andrade

16/11/2017*/

const knex = require('../../database');
const validacao = require('../../validacao');

module.exports = async (socket, pessoa, dados) => {
    const ele = await knex.select('*')
        .from('mensagem')
        .where('id_destino', pessoa.id)
        .where('id_origem', 1);

    const eu = await knex.select('*')
        .from('mensagem')
        .where('id_origem', pessoa.id)
        .where('id_destino', 1);

    socket.emit('sicronizaRecebe', JSON.stringify({
        eu,
        ele,
    }));
};